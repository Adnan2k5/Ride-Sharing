package com.ems.ems_server;

import java.util.HashMap;
import java.util.Map;
import com.ems.ems_server.Email.EmailService;
import com.ems.ems_server.Model.UserModel;
import com.ems.ems_server.Repository.UserRepository;
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

    private Map<String, String> otpStore = new HashMap<>();

    public static void main(String[] args) {
        SpringApplication.run(EmsServerApplication.class, args);
    }

    public String genOtp() {
        int otp = (int) (Math.random() * 9000) + 1000;
        return String.valueOf(otp);
    }

    @PostMapping(value = "/api/otp-verification")
    public String sendOtp(@RequestBody String user) {
        JsonObject jsObj = gson.fromJson(user, JsonObject.class);
        String email = jsObj.get("email").getAsString();
        System.out.println(email);
        String otp = genOtp();
        String msg = emailService.sendOtp(email, otp);
        otpStore.put(email, otp);
        return msg;
    }

    @PostMapping(value = "/api/verify")
    public String verifyOtp(@RequestBody String user) {
        JsonObject jsonObject = gson.fromJson(user, JsonObject.class);
        String email = jsonObject.get("email").getAsString();
        String otp = jsonObject.get("otp").getAsString();
        if (otpStore.containsKey(email) && otpStore.containsValue(otp) && otpStore.get(email).equals(otp)) {
            otpStore.remove(email);
            return "OTP verified successfully";
        } else {
            return "Invalid OTP";
        }
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> registerUser(@RequestBody String entity) {
        JsonObject jsObj = gson.fromJson(entity, JsonObject.class);
        String email = jsObj.get("email").getAsString();
        String password = jsObj.get("password").getAsString();
        UserModel existingUser = userRepo.findByEmail(email);
        if (existingUser != null) {
            return ResponseEntity.ok("User already exists");
        }
        UserModel user = new UserModel();
        user.setEmail(email);
        user.setPassword(password);
        userRepo.save(user);
        return ResponseEntity.ok(user);
    }

    //JWT Login 


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
    public ResponseEntity<?> postMethodName(@RequestBody String user) {
        try {
            JsonObject jsobj = gson.fromJson(user, JsonObject.class);
            System.out.println(jsobj);
            String email = jsobj.get("email").getAsString();
            String password = jsobj.get("password").getAsString();
            try {
                UserModel extuser = userRepo.findByEmail(email);
                if (extuser.getPassword().equals(password)) {
                    return ResponseEntity.ok(extuser);
                } else {
                    return ResponseEntity.status(401).body("Invalid Password");
                }
            } catch (Exception e) {
                return ResponseEntity.status(401).body("Invalid Credentials");
            }

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Internal Server Error");
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
