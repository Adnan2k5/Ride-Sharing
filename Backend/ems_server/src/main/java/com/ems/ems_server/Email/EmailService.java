package com.ems.ems_server.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public String sendOtp(String email, String Otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("OTP for verification");
        message.setText("Your otp is: " + Otp);
        mailSender.send(message);
        return "Mail Sent to " + email;
    }
}
