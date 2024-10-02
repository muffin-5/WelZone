package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.FeedbackLog;
import com.dbms.WelZoneApp.service.FeedbackLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback-log")
public class FeedbackLogController {
    private final FeedbackLogService feedbackLogService;

    public FeedbackLogController(FeedbackLogService feedbackLogService) {
        this.feedbackLogService = feedbackLogService;
    }

    @GetMapping
    public ResponseEntity<List<FeedbackLog>> getAllFeedbackLogs() {
        return ResponseEntity.ok(feedbackLogService.getAllFeedbackLogs());
    }

    @GetMapping("/{auditId}/{feedbackId}")
    public ResponseEntity<FeedbackLog> getFeedbackLog(@PathVariable Long auditId, @PathVariable Long feedbackId) {
        FeedbackLog feedbackLog = feedbackLogService.getFeedbackLog(auditId, feedbackId);
        return feedbackLog != null ? ResponseEntity.ok(feedbackLog) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Void> createFeedbackLog(@RequestBody FeedbackLog feedbackLog) {
        feedbackLogService.addFeedbackLog(feedbackLog);
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("/{auditId}/{feedbackId}")
    public ResponseEntity<Void> deleteFeedbackLog(@PathVariable Long auditId, @PathVariable Long feedbackId) {
        feedbackLogService.removeFeedbackLog(auditId, feedbackId);
        return ResponseEntity.noContent().build();
    }
}
