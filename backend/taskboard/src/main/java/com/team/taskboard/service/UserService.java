package com.team.taskboard.service;

import com.team.taskboard.model.User;
import com.team.taskboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	 @Autowired
	    private UserRepository userRepository;

	    public User login(String email, String password) {
	        User user = userRepository.findByEmail(email);
	        
	        if (user != null && user.getPasswordHash().equals(password)) {
	            return user;
	        }
	        return null;
	    }
}
