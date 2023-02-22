package com.example.demo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HelloController {

	@GetMapping("/param/abc")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}