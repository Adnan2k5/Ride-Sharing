package com.ems.ems_server.Routes;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ems.ems_server.Email.EmailService;
import com.ems.ems_server.Model.UserModel;
import com.ems.ems_server.Repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
@RestController
public class Otp_verfication {

    @Autowired
    EmailService emailService;

    @Autowired
    UserRepository userRepo;
    private final Gson gson = new Gson();
    private Map<String, String> otpStore = new HashMap<>();

    public String genOtp() {
        int otp = (int) (Math.random() * 9000) + 1000;
        return String.valueOf(otp);
    }
    @PostMapping(value = "/api/otp-verification")
    public ResponseEntity<?> sendOtp(@RequestBody String user) {
        JsonObject jsObj = gson.fromJson(user, JsonObject.class);
        String email = jsObj.get("email").getAsString();
        UserModel extuser = userRepo.findByEmail(email);
        if(extuser != null){
            return ResponseEntity.status(409).body("User already exists");
        }
        String otp = genOtp();
        String msg = emailService.sendOtp(email, otp);
        otpStore.put(email, otp);
        return ResponseEntity.ok(msg);
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
}
