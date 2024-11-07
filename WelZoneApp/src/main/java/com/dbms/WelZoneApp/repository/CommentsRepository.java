package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Comments;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentsRepository {
    private final JdbcTemplate jdbcTemplate;

    public CommentsRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Comments> findAll() {
        String sql = "SELECT * FROM comments";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Comments comment = new Comments();
            comment.setCommentId(rs.getLong("commentId"));
            comment.setFeedbackId(rs.getLong("feedbackId"));
            comment.setComment(rs.getString("comment"));
            return comment;
        });
    }

    public Comments findById(Long commentId) {
        String sql = "SELECT * FROM comments WHERE commentId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{commentId}, (rs, rowNum) -> {
            Comments comment = new Comments();
            comment.setCommentId(rs.getLong("commentId"));
            comment.setFeedbackId(rs.getLong("feedbackId"));
            comment.setComment(rs.getString("comment"));
            return comment;
        });
    }

    public void save(Comments comment) {
        String sql = "INSERT INTO comments (feedbackId, comment) VALUES (?, ?)";
        jdbcTemplate.update(sql, comment.getFeedbackId(), comment.getComment());
    }

    public void update(Comments comment) {
        String sql = "UPDATE comments SET feedbackId = ?, comment = ? WHERE commentId = ?";
        jdbcTemplate.update(sql, comment.getFeedbackId(), comment.getComment(), comment.getCommentId());
    }

    public void delete(Long commentId) {
        String sql = "DELETE FROM comments WHERE commentId = ?";
        jdbcTemplate.update(sql, commentId);
    }
}
