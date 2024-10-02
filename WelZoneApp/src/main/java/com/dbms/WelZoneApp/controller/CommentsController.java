package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Comments;
import com.dbms.WelZoneApp.service.CommentsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentsController {
    private final CommentsService commentsService;

    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @GetMapping
    public List<Comments> getAllComments() {
        return commentsService.getAllComments();
    }

    @GetMapping("/{id}")
    public Comments getCommentById(@PathVariable("id") Long commentId) {
        return commentsService.getCommentById(commentId);
    }

    @PostMapping
    public void addComment(@RequestBody Comments comment) {
        commentsService.addComment(comment);
    }

    @PutMapping("/{id}")
    public void updateComment(@PathVariable("id") Long commentId, @RequestBody Comments comment) {
        comment.setCommentId(commentId);
        commentsService.updateComment(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable("id") Long commentId) {
        commentsService.deleteComment(commentId);
    }
}
