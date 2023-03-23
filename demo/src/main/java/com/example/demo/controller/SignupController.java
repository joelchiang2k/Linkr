package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.Service.MailService;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.AddressException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.UUID;
@RequiredArgsConstructor
@RestController
public class SignupController {

    private final MailService mailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping(path = "/signup")
    @CrossOrigin(origins = "http://192.168.84.43:19006")
    public ResponseEntity<String> signup(@RequestBody User user) throws AddressException, UnsupportedEncodingException {
        String email = user.getEmail();

        // Check if the email already exists in the database
        User existingUser = userRepository.findUserByEmail(email);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        user.setAuthentication(false);

        // String id is initialized to hash unique instance for the user.
        user.setId(UUID.randomUUID().toString());

        String authKey = user.getId().substring(0, 6);

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);


        userRepository.save(user);

        mailService.sendMail(email, authKey);
        System.out.println("SUCCESS IN SENDING MAIL");

        return ResponseEntity.ok(email);
    }

    @PostMapping(path = "/authAgain", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://192.168.84.43:19006")
    public String authAgain(@RequestBody AuthAgainRequest request) {
        String email = request.getEmail();
        System.out.println("Below email");
        System.out.println(email);
        User user = userRepository.findUserByEmail(email);
        mailService.sendMail(email, user.getId().substring(0, 6));
        return "Successfully re-sent validation email";
    }

    @PostMapping(path = "/authConfirm", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://192.168.84.43:19006")
    public ResponseEntity<String> authConfirm(@RequestBody ConfirmRequest request) {
        String email = request.getEmail();
        String keyCode = request.getKeyCode();

        System.out.println(email);
        System.out.println(keyCode);

        User user = userRepository.findUserByEmail(email);

        String validKey = user.getId().substring(0, 6);
        if (keyCode.equals(validKey)) {
            Query query = new Query(Criteria.where("email").is(email));
            Update update = new Update().set("authentication", true);
            mongoTemplate.updateFirst(query, update, User.class);
            return ResponseEntity.ok("Success");
        } else {
            return ResponseEntity.badRequest().body("Token validation failed");
        }
    }

    // Create a class to represent the request payload for /authConfirm
    public static class ConfirmRequest {
        private String email;
        private String keyCode;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getKeyCode() {
            return keyCode;
        }

        public void setKeyCode(String keyCode) {
            this.keyCode = keyCode;
        }
    }

    public static class AuthAgainRequest {
        private String email;

        public AuthAgainRequest() {
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}
