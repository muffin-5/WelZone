package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Feedback;
import com.dbms.WelZoneApp.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/{id}")
    public Feedback getFeedbackById(@PathVariable("id") Long feedbackId) {
        return feedbackService.getFeedbackById(feedbackId);
    }

    @PostMapping
    public void addFeedback(@RequestBody Feedback feedback) {
        feedbackService.addFeedback(feedback);
    }

    @PutMapping("/{id}")
    public void updateFeedback(@PathVariable("id") Long feedbackId, @RequestBody Feedback feedback) {
        feedback.setFeedbackId(feedbackId);
        feedbackService.updateFeedback(feedback);
    }

    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable("id") Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
    }
}
