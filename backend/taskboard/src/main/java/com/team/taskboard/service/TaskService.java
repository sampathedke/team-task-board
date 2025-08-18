package com.team.taskboard.service;

import java.util.List;
import java.util.Optional;

import com.team.taskboard.repository.CommentRepository;
import com.team.taskboard.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.team.taskboard.model.Task;

@Service
public class TaskService {

	 @Autowired
	    private TaskRepository taskRepository;

	    public Task createTask(Task task) {
	        return taskRepository.save(task);
	    }

	    public List<Task> getAllTasks() {
	        return taskRepository.findAll();
	    }

	    public Task updateTask(Long id, Task updatedTask) {
	        Optional<Task> taskOptional = taskRepository.findById(id);
	        if (taskOptional.isPresent()) {
	            Task task = taskOptional.get();
	            task.setTitle(updatedTask.getTitle());
	            task.setDescription(updatedTask.getDescription());
	            task.setPriority(updatedTask.getPriority());
	            task.setStatus(updatedTask.getStatus());
	            task.setAssignee(updatedTask.getAssignee());
	            task.setDueDate(updatedTask.getDueDate());
	            return taskRepository.save(task);
	        }
	        return null;
	    }

	    public Task getTask(Long id) {
	        return taskRepository.findById(id).orElse(null);
	    }

	    @Autowired
	    private CommentRepository commentRepository;

	    public void deleteTask(Long id) {
	        // delete all comments for the task first
	        commentRepository.deleteByTaskId(id);
	        taskRepository.deleteById(id);
	    }

}