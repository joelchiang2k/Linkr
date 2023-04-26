package com.example.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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

    // Add the new fields here
    private String bio;
    private String location;
    private String desiredRole;
    private String resumeCvLink;

    private String jobPostLink;

    // For students
    private String sponsorshipStatus;

    // For recruiters
    private String sponsorshipAvailability;

    private List matchingPeople;
}
