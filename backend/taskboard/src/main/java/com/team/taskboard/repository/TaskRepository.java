package com.team.taskboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.taskboard.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
   
}