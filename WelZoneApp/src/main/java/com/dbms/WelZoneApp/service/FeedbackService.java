package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Feedback;
import com.dbms.WelZoneApp.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Create feedback
    public void createFeedback(Feedback feedback) {
        feedbackRepository.createFeedback(feedback);
    }

    // Find feedback by ID
    public Feedback findFeedbackById(Long id) {
        return feedbackRepository.findFeedbackById(id);
    }

    // Find feedback by user ID
    public List<Feedback> findFeedbackByUserId(Long userId) {
        return feedbackRepository.findFeedbackByUserId(userId);
    }

    // Find feedback by counselor ID
    public List<Feedback> findFeedbackByCounselorId(Long counselorId) {
        return feedbackRepository.findFeedbackByCounselorId(counselorId);
    }
}
