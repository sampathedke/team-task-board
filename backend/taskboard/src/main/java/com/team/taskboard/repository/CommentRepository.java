package com.team.taskboard.repository;

import com.team.taskboard.model.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Comment c WHERE c.task.id = :taskId")
	void deleteByTaskId(Long taskId);
    
    List<Comment> findByTaskId(Long taskId);

}
