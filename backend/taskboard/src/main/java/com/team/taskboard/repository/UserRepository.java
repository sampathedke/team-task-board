package com.team.taskboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.team.taskboard.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    
    User findByEmail(String email);
}