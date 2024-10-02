package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Feedback;
import com.dbms.WelZoneApp.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Create new feedback
    @PostMapping("/create")
    public ResponseEntity<String> createFeedback(@RequestBody Feedback feedback) {
        feedbackService.createFeedback(feedback);
        return ResponseEntity.ok("Feedback submitted successfully.");
    }

    // Get feedback by ID
    @GetMapping("/{id}")
    public Feedback getFeedbackById(@PathVariable Long id) {
        return feedbackService.findFeedbackById(id);
    }

    // Get feedback by user ID
    @GetMapping("/user/{userId}")
    public List<Feedback> getFeedbackByUserId(@PathVariable Long userId) {
        return feedbackService.findFeedbackByUserId(userId);
    }

    // Get feedback by counselor ID
    @GetMapping("/counselor/{counselorId}")
    public List<Feedback> getFeedbackByCounselorId(@PathVariable Long counselorId) {
        return feedbackService.findFeedbackByCounselorId(counselorId);
    }
}

