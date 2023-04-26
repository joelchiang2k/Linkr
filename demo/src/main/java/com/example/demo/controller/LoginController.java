package com.example.demo.controller;

import com.example.demo.Service.MailService;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RequiredArgsConstructor
@RestController
public class LoginController {

    private final MailService mailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping(path = "/login")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>> login(@RequestParam(value = "username") String email,
                                                     @RequestParam(value = "password") String password) {
        User user = userRepository.findUserByEmail(email);

        if (passwordEncoder.matches(password, user.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login Attempt detected from Spring-Boot backend");
            response.put("authenticator", user.isAuthentication());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Invalid username or password"));
        }
    }

    @PostMapping(path = "/forgetPwd")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> forgetPwd(@RequestParam(value = "username") String username) {
        User user = userRepository.findUserByEmail(username);
        System.out.println(user);

        if (user != null) {
            // Implement your password reset logic here, e.g., sending an email with a reset link
            mailService.sendMail(user.getEmail(), user.getId().substring(0, 6));

            return ResponseEntity.ok("Password reset instructions have been sent to your email.");
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    @PostMapping(path = "/resetPwd")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> resetPassword(@RequestParam(value = "code") String code,
                                                @RequestParam(value = "email") String email,
                                                @RequestParam(value = "password") String newPassword) {

        System.out.println("asdjhs");

        // Find the user by the code (you may need to create a new method in your UserRepository for this)
        User user = userRepository.findUserByEmail(email);
        String validKey = user.getId().substring(0, 6);

        if (user != null) {
            if (code.equals(validKey)) {
                String encodedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encodedPassword);
                userRepository.save(user);
                return ResponseEntity.ok("Password reset successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid code");
            }
        } else {
            return ResponseEntity.badRequest().body("No User Found!");

        }
    }




}