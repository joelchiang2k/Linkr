package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{id:'?0'}")
    User findItemByName(String id);

    @Query(value = "{type:'?0'}")
    List<User> findAllType(String userType);

    @Query("{email:'?0'}")
    User findUserByEmail(String email);

    User findUserByUsername(String username);
    public long count();
}
