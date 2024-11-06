package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Feedback;
import com.dbms.WelZoneApp.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getFeedbackById(Long feedbackId) {
        return feedbackRepository.findById(feedbackId);
    }

    public void addFeedback(Feedback feedback) {
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setUpdatedAt(LocalDateTime.now());
        feedbackRepository.save(feedback);
    }

    public void updateFeedback(Feedback feedback) {
        feedbackRepository.update(feedback);
    }

    public void deleteFeedback(Long feedbackId) {
        feedbackRepository.delete(feedbackId);
    }
}
