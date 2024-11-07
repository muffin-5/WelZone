package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Comments;
import com.dbms.WelZoneApp.repository.CommentsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;

    public CommentsService(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    public List<Comments> getAllComments() {
        return commentsRepository.findAll();
    }

    public Comments getCommentById(Long commentId) {
        return commentsRepository.findById(commentId);
    }

    public void addComment(Comments comment) {
        commentsRepository.save(comment);
    }

    public void updateComment(Comments comment) {
        commentsRepository.update(comment);
    }

    public void deleteComment(Long commentId) {
        commentsRepository.delete(commentId);
    }
}
