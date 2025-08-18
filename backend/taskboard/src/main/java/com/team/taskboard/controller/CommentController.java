package com.team.taskboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.team.taskboard.model.Comment;
import com.team.taskboard.service.CommentService;

@RestController
@RequestMapping("/api/tasks")
public class CommentController {

	@Autowired
    private CommentService commentService;

    @PostMapping("/{taskId}/comments")
    public Comment addComment(@PathVariable Long taskId,
                              @RequestParam Long authorId,
                              @RequestParam String body) {
        Comment comment = new Comment();
        comment.setBody(body);
        
        var task = new com.team.taskboard.model.Task();
        task.setId(taskId);

        var user = new com.team.taskboard.model.User();
        user.setId(authorId);

        comment.setTask(task);
        comment.setAuthor(user);

        comment.setCreatedAt(java.time.LocalDateTime.now());

        return commentService.addComment(comment);
    }
    @GetMapping("/{taskId}/comments")
    public List<Comment> getComments(@PathVariable Long taskId) {
        return commentService.getCommentsByTaskId(taskId);
    }
}
