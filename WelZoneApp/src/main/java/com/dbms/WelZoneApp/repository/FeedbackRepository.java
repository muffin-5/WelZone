package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class FeedbackRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // SQL queries
    private static final String INSERT_FEEDBACK_SQL = "INSERT INTO feedback (user_id, counselor_id, slot_id, rating, comment) VALUES (?, ?, ?, ?, ?)";
    private static final String FIND_FEEDBACK_BY_ID_SQL = "SELECT * FROM feedback WHERE id = ?";
    private static final String FIND_FEEDBACK_BY_USER_SQL = "SELECT * FROM feedback WHERE user_id = ?";
    private static final String FIND_FEEDBACK_BY_COUNSELOR_SQL = "SELECT * FROM feedback WHERE counselor_id = ?";

    // Method to create feedback
    public void createFeedback(Feedback feedback) {
        jdbcTemplate.update(INSERT_FEEDBACK_SQL, feedback.getUserId(), feedback.getCounselorId(), feedback.getSlotId(), feedback.getRating(), feedback.getComment());
    }

    // Method to find feedback by ID
    public Feedback findFeedbackById(Long id) {
        return jdbcTemplate.queryForObject(FIND_FEEDBACK_BY_ID_SQL, new Object[]{id}, new FeedbackRowMapper());
    }

    // Method to find feedback by user ID
    public List<Feedback> findFeedbackByUserId(Long userId) {
        return jdbcTemplate.query(FIND_FEEDBACK_BY_USER_SQL, new Object[]{userId}, new FeedbackRowMapper());
    }

    // Method to find feedback by counselor ID
    public List<Feedback> findFeedbackByCounselorId(Long counselorId) {
        return jdbcTemplate.query(FIND_FEEDBACK_BY_COUNSELOR_SQL, new Object[]{counselorId}, new FeedbackRowMapper());
    }

    // RowMapper for Feedback model
    private static class FeedbackRowMapper implements RowMapper<Feedback> {
        @Override
        public Feedback mapRow(ResultSet rs, int rowNum) throws SQLException {
            Feedback feedback = new Feedback();
            feedback.setId(rs.getLong("id"));
            feedback.setUserId(rs.getLong("user_id"));
            feedback.setCounselorId(rs.getLong("counselor_id"));
            feedback.setSlotId(rs.getLong("slot_id"));
            feedback.setRating(rs.getInt("rating"));
            feedback.setComment(rs.getString("comment"));
            return feedback;
        }
    }
}

