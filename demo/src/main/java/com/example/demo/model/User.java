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
    private String name;
    private int age;
    private String school;
    private float gpa;
    private Type type;

    public enum Type {
        STUDENT,
        RECRUITER
    }
}
