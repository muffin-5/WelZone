package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.FeedbackLog;
import com.dbms.WelZoneApp.repository.FeedbackLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackLogService {
    private final FeedbackLogRepository feedbackLogRepository;

    public FeedbackLogService(FeedbackLogRepository feedbackLogRepository) {
        this.feedbackLogRepository = feedbackLogRepository;
    }

    public List<FeedbackLog> getAllFeedbackLogs() {
        return feedbackLogRepository.findAll();
    }

    public FeedbackLog getFeedbackLog(Long auditId, Long feedbackId) {
        return feedbackLogRepository.findById(auditId, feedbackId);
    }

    public void addFeedbackLog(FeedbackLog feedbackLog) {
        feedbackLogRepository.save(feedbackLog);
    }

    public void removeFeedbackLog(Long auditId, Long feedbackId) {
        feedbackLogRepository.delete(auditId, feedbackId);
    }
}
