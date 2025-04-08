package com.ems.ems_server.Routes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ems.ems_server.Email.EmailService;
import com.ems.ems_server.Model.UserModel;
import com.ems.ems_server.Repository.UserRepository;
import com.ems.ems_server.Utility.JwtUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@RestController
public class AuthRoutes {

    @Autowired
    EmailService emailService;

    @Autowired
    UserRepository userRepo;

    private final Gson gson = new Gson();

    public String genOtp() {
        int otp = (int) (Math.random() * 9000) + 1000;
        return String.valueOf(otp);
    }


    @PostMapping("/api/register")
    public ResponseEntity<?> registerUser(@RequestBody String entity) {
        JsonObject jsObj = gson.fromJson(entity, JsonObject.class);
        String email = jsObj.get("email").getAsString();
        String password = jsObj.get("password").getAsString();
        String name = jsObj.get("name").getAsString();
        String role = jsObj.get("role").getAsString();
        if(role.equalsIgnoreCase("true")){
            role = "captain";
        }
        else{
            role = "user";
        }
        UserModel existingUser = userRepo.findByEmail(email);
        if (existingUser != null) {
            return ResponseEntity.ok("User already exists");
        }
        UserModel user = new UserModel();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setRole(role);
        userRepo.save(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> LoginUser(@RequestBody String user) {
        try {
            JsonObject jsobj = gson.fromJson(user, JsonObject.class);
            String email = jsobj.get("email").getAsString();
            String password = jsobj.get("password").getAsString();
            try {
                UserModel extuser = userRepo.findByEmail(email);
                if (extuser.getPassword().equals(password)) {
                    String token = JwtUtils.generateToken(email);
                    JsonObject response = new JsonObject();
                    response.addProperty("token", token);
                    response.add("user", gson.toJsonTree(extuser));
                    return ResponseEntity.ok(response.toString());
                } else {
                    return ResponseEntity.status(401).body("Invalid Password");
                }
            } catch (Exception e) {
                return ResponseEntity.status(401).body("Invalid Credentials");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @PostMapping("/api/fetchUser")
    public ResponseEntity<?> fetchUser(@RequestBody String entity) {
        try{
        JsonObject jsobj = gson.fromJson(entity, JsonObject.class);
        String token = jsobj.get("token").getAsString();
        String decoded = JwtUtils.extractEmail(token);
        UserModel user = userRepo.findByEmail(decoded);
        if(user != null){
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(401).body("Unauthorised Token");
        }}
        catch(Exception e){
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
    

    
}
