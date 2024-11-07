package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Feedback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FeedbackRepository {
    private final JdbcTemplate jdbcTemplate;

    public FeedbackRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Feedback> findAll() {
        String sql = "SELECT * FROM feedback";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Feedback feedback = new Feedback();
            feedback.setFeedbackId(rs.getLong("feedbackId"));
            feedback.setSessionId(rs.getLong("sessionId"));
            feedback.setRating(rs.getInt("rating"));
            feedback.setComments(rs.getString("comments"));
            feedback.setCreatedAt(rs.getTimestamp("createdAt").toLocalDateTime());
            feedback.setUpdatedAt(rs.getTimestamp("updatedAt").toLocalDateTime());
            return feedback;
        });
    }

    public List<Feedback> findById(Long feedbackId) {
        String sql = "SELECT * FROM feedback WHERE sessionId = ?";
        return jdbcTemplate.query(sql, new Object[]{feedbackId}, (rs, rowNum) -> {
            Feedback feedback = new Feedback();
            feedback.setFeedbackId(rs.getLong("feedbackId"));
            feedback.setSessionId(rs.getLong("sessionId"));
            feedback.setRating(rs.getInt("rating"));
            feedback.setComments(rs.getString("comments"));
            feedback.setCreatedAt(rs.getTimestamp("createdAt").toLocalDateTime());
            feedback.setUpdatedAt(rs.getTimestamp("updatedAt").toLocalDateTime());
            return feedback;
        });
    }

    public void save(Feedback feedback) {
//        System.out.println("Hello");
        String sql = "INSERT INTO feedback (sessionId, rating, comments, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, feedback.getSessionId(), feedback.getRating(), feedback.getComments(), feedback.getCreatedAt(), feedback.getUpdatedAt());
    }

    public void update(Feedback feedback) {
        String sql = "UPDATE feedback SET sessionId = ?, rating = ?, comments = ?, updatedAt = ? WHERE feedbackId = ?";
        jdbcTemplate.update(sql, feedback.getSessionId(), feedback.getRating(), feedback.getComments(), feedback.getUpdatedAt(), feedback.getFeedbackId());
    }

    public void delete(Long feedbackId) {
        String sql = "DELETE FROM feedback WHERE feedbackId = ?";
        jdbcTemplate.update(sql, feedbackId);
    }
}
