package com.example.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    private String id;
    private String username;
    private String email;

    private String password;
    private String school;
    private float gpa;

    private String userType;

    private String companyName;

    private boolean authentication;

    // private Type userType;

//    public enum Type {
//        Student,
//        Recruiter
//    }
}
