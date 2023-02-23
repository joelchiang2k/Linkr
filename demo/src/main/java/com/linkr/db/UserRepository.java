package com.linkr.db;

//import com.example.myproject.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    //repository methds
    User findByEmail(String email);
}

