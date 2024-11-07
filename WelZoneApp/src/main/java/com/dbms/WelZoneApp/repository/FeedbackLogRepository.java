package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.FeedbackLog;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FeedbackLogRepository {
    private final JdbcTemplate jdbcTemplate;

    public FeedbackLogRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<FeedbackLog> findAll() {
        String sql = "SELECT * FROM feedback_log";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            FeedbackLog feedbackLog = new FeedbackLog();
            feedbackLog.setAuditId(rs.getLong("auditId"));
            feedbackLog.setFeedbackId(rs.getLong("feedbackId"));
            return feedbackLog;
        });
    }

    public FeedbackLog findById(Long auditId, Long feedbackId) {
        String sql = "SELECT * FROM feedback_log WHERE auditId = ? AND feedbackId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{auditId, feedbackId}, (rs, rowNum) -> {
            FeedbackLog feedbackLog = new FeedbackLog();
            feedbackLog.setAuditId(rs.getLong("auditId"));
            feedbackLog.setFeedbackId(rs.getLong("feedbackId"));
            return feedbackLog;
        });
    }

    public void save(FeedbackLog feedbackLog) {
        String sql = "INSERT INTO feedback_log (auditId, feedbackId) VALUES (?, ?)";
        jdbcTemplate.update(sql, feedbackLog.getAuditId(), feedbackLog.getFeedbackId());
    }

    public void delete(Long auditId, Long feedbackId) {
        String sql = "DELETE FROM feedback_log WHERE auditId = ? AND feedbackId = ?";
        jdbcTemplate.update(sql, auditId, feedbackId);
    }
}
