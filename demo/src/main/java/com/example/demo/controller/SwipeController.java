package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SwipeController {

    @PostMapping(path = "/swipeleft")
    @CrossOrigin(origins = "*")
    public String swipeleft(@RequestParam(value = "username") String name){

        System.out.println(name);

        return "Swipe-left detected from Spring-Boot";

    }
}
