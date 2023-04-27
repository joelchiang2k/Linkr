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
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.TopicPartitionInfo;
import org.apache.kafka.common.PartitionInfo;
import org.apache.kafka.common.errors.TopicExistsException;
import org.springframework.kafka.core.KafkaTemplate;

@RequiredArgsConstructor
@RestController
public class LoginController {

    private final MailService mailService;

    private AdminClient createAdminClient() {
    Properties props = new Properties();
    props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    return AdminClient.create(props);
}

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping(path = "/login")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>> login(@RequestParam(value = "username") String email,
                                                     @RequestParam(value = "password") String password) {
        User user = userRepository.findUserByEmail(email);

        // Create a Kafka topic for the user
        String topicName = email;
        try (AdminClient adminClient = createAdminClient()) {
            NewTopic topic = new NewTopic(topicName, 1, (short)1);
            adminClient.createTopics(Collections.singleton(topic));
        } catch (TopicExistsException ex) {
            // Ignore exception if topic already exists
        }

        // Send a message to the user's topic
        kafkaTemplate.send(topicName, "Welcome to your messaging queue!");

        // Partition the topic by email
        List<PartitionInfo> partitions = kafkaTemplate.partitionsFor(topicName);
        int numPartitions = partitions.size();
        int partitionIndex = email.hashCode() % numPartitions;
        kafkaTemplate.send(topicName, partitionIndex, null, "Partitioned message for user " + email);
        
        String userType = user.getUserType();
        String passType = "";
        if (userType.equals("RECRUITER")){
            passType = "STUDENT";
        }else {
            passType = "RECRUITER";
        }

        List <User> testPhase =userRepository.findAllType(passType);

        System.out.println("Here is the phase");
        for (User currentUser : testPhase) {
            System.out.println("Below");
            System.out.println(currentUser);
        }

        if (passwordEncoder.matches(password, user.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login Attempt detected from Spring-Boot backend");
            response.put("authenticator", user.isAuthentication());
            response.put("ListPeople", testPhase);

            System.out.println("success");
            return ResponseEntity.ok(response);
        } else {
            System.out.println("fail");
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