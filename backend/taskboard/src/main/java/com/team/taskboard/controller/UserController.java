package com.team.taskboard.controller;

import com.team.taskboard.model.User;
import com.team.taskboard.repository.UserRepository;
import com.team.taskboard.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/signup")
	public User signup(@RequestParam String email,
	                   @RequestParam String password) {
	    User user = new User();
	    user.setEmail(email);
	    user.setPasswordHash(password);
	    return userRepository.save(user);
	}


	 @Autowired
	    private UserService userService;

	    @PostMapping("/login")
	    public User login(@RequestParam String email,
	                      @RequestParam String password) {
	        return userService.login(email, password);
	    }
	    @GetMapping
	    public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }

}