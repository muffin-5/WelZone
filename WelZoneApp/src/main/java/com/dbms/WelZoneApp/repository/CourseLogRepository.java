package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.CourseLog;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CourseLogRepository {
    private final JdbcTemplate jdbcTemplate;

    public CourseLogRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CourseLog> findAll() {
        String sql = "SELECT * FROM course_log";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            CourseLog courseLog = new CourseLog();
            courseLog.setAuditId(rs.getLong("auditId"));
            courseLog.setCourseId(rs.getLong("courseId"));
            return courseLog;
        });
    }

    public CourseLog findById(Long auditId, Long courseId) {
        String sql = "SELECT * FROM course_log WHERE auditId = ? AND courseId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{auditId, courseId}, (rs, rowNum) -> {
            CourseLog courseLog = new CourseLog();
            courseLog.setAuditId(rs.getLong("auditId"));
            courseLog.setCourseId(rs.getLong("courseId"));
            return courseLog;
        });
    }

    public void save(CourseLog courseLog) {
        String sql = "INSERT INTO course_log (auditId, courseId) VALUES (?, ?)";
        jdbcTemplate.update(sql, courseLog.getAuditId(), courseLog.getCourseId());
    }

    public void delete(Long auditId, Long courseId) {
        String sql = "DELETE FROM course_log WHERE auditId = ? AND courseId = ?";
        jdbcTemplate.update(sql, auditId, courseId);
    }
}
