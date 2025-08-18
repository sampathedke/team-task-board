package com.team.taskboard.model;


import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String email;
	    private String passwordHash;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPasswordHash() {
			return passwordHash;
		}
		public void setPasswordHash(String passwordHash) {
			this.passwordHash = passwordHash;
		}
	    
	    
}
