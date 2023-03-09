package com.example.demo.controller;


import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;
    @PostMapping(path = "/login")
    @CrossOrigin(origins = "http://10.186.79.202:19006")
    public String login(@RequestParam(value = "username") String name,
                        @RequestParam(value = "password") String password) {

       // System.out.println(name);
       // System.out.println(password);
        String id = UUID.randomUUID().toString();
        userRepository.save(new User(id ,
                name, 10, "Purdue", (float)3.1, User.Type.RECRUITER));

       List<User> list = userRepository.findAll(User.Type.STUDENT);
       for (User u: list) {
           System.out.println(u.getId());
       }

        //check if username is provided
        // check if password is provided

        // call mongodb
        // check if user exists
        // if yes, get the hashed password from mongo
        // hash the password provided in the request
        // check if the hashes match
        // if the hashes match then login success
        // else failure

        return "Happy Re-routing";
    }


}