package com.ems.ems_server;

import com.ems.ems_server.Email.EmailService;
import com.ems.ems_server.Model.UserModel;
import com.ems.ems_server.Repository.UserRepository;
import com.ems.ems_server.Utility.JwtUtils;
// import com.ems.ems_server.Utility.Jwt;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

// import javax.servlet.http.Cookie;
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EmsServerApplication {

    @Autowired
    EmailService emailService;

    @Autowired
    UserRepository userRepo;

    private final Gson gson = new Gson();

    public static void main(String[] args) {
        SpringApplication.run(EmsServerApplication.class, args);
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
        System.out.println(role);
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

    // JWT Login

    // @PostMapping("/api/login")
    // public ResponseEntity<?> postMethodName(@RequestBody String user) {
    // JsonObject jsObj = gson.fromJson(user, JsonObject.class);
    // String email = jsObj.get("email").getAsString();
    // String password = jsObj.get("password").getAsString();
    // UserModel extuser = userRepo.findByEmail(email);
    // if( extuser == null){
    // return ResponseEntity.ok("User not found");
    // }
    // else{
    // if(extuser.getPassword().equals(password)){
    // String token = Jwt.generateToken(email);
    // Cookie cookie = new Cookie("auth_token", token);
    // cookie.setHttpOnly(true);
    // cookie.setSecure(false);
    // cookie.setPath("/");
    // cookie.setMaxAge(36000000);
    // return ResponseEntity.ok(extuser);
    // }
    // else{
    // return ResponseEntity.ok("Invalid Password");
    // }
    // }
    // }

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
    

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");
        config.setAllowCredentials(true);
        config.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
