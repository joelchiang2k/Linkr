package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{id:'?0'}")
    User findItemByName(String id);

    @Query(value = "{type:'?0'}")
    List<User> findAll(User.Type type);

    public long count();
}
