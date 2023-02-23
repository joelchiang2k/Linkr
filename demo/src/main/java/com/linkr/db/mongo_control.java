//not used yet
// package com.linkr.db;

// //import com.linkr.db.model;
// import com.example.myproject.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/users")
// public class UserController {

// @Autowired
// private UserRepository userRepository;

// @GetMapping("/")
// public List<User> getAllUsers() {
// return userRepository.findAll();
// }

// @GetMapping("/{id}")
// public Optional<User> getUserById(@PathVariable String id) {
// return userRepository.findById(id);
// }

// @PostMapping("/")
// public User createUser(@RequestBody User user) {
// return userRepository.save(user);
// }

// @PutMapping("/{id}")
// public User updateUser(@PathVariable String id, @RequestBody User user) {
// user.setId(id);
// return userRepository.save(user);
// }

// @DeleteMapping("/{id}")
// public void deleteUser(@PathVariable String id) {
// userRepository.deleteById(id);
// }

