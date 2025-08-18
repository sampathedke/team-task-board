package com.team.taskboard.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="tasks")
public class Task {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String title;
	    private String description;
	    private String priority;  
	    private String status;    
	    
	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
	    private LocalDateTime dueDate;
	    @JsonFormat(pattern = "yyyy-MM-dd")
	    private LocalDateTime createdAt;
	    @JsonFormat(pattern = "yyyy-MM-dd")
	    private LocalDateTime updatedAt;

	    @ManyToOne
	    @JoinColumn(name = "assignee_id")
	    private User assignee;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getPriority() {
			return priority;
		}

		public void setPriority(String priority) {
			this.priority = priority;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public LocalDateTime getDueDate() {
			return dueDate;
		}

		public void setDueDate(LocalDateTime dueDate) {
			this.dueDate = dueDate;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public LocalDateTime getUpdatedAt() {
			return updatedAt;
		}

		public void setUpdatedAt(LocalDateTime updatedAt) {
			this.updatedAt = updatedAt;
		}

		public User getAssignee() {
			return assignee;
		}

		public void setAssignee(User assignee) {
			this.assignee = assignee;
		}
	    
    
}