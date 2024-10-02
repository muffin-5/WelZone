package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.CourseEnrollment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class CourseEnrollmentRepository {

    private final JdbcTemplate jdbcTemplate;

    public CourseEnrollmentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper to map ResultSet to CourseEnrollment objects
    private RowMapper<CourseEnrollment> courseEnrollmentRowMapper = (rs, rowNum) -> new CourseEnrollment(
            rs.getLong("userId"),
            rs.getLong("courseId"),
            rs.getTimestamp("enrollmentDate").toLocalDateTime(),
            rs.getString("status"),
            rs.getTimestamp("createdAt").toLocalDateTime(),
            rs.getTimestamp("updatedAt").toLocalDateTime()
    );

    // CRUD Operations
    public List<CourseEnrollment> findAll() {
        String sql = "SELECT * FROM course_enrollments";
        return jdbcTemplate.query(sql, courseEnrollmentRowMapper);
    }

    public CourseEnrollment findById(Long userId, Long courseId) {
        String sql = "SELECT * FROM course_enrollments WHERE userId = ? AND courseId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{userId, courseId}, courseEnrollmentRowMapper);
    }

    public int save(CourseEnrollment courseEnrollment) {
        String sql = "INSERT INTO course_enrollments (userId, courseId, enrollmentDate, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, courseEnrollment.getUserId(), courseEnrollment.getCourseId(),
                courseEnrollment.getEnrollmentDate(), courseEnrollment.getStatus(),
                courseEnrollment.getCreatedAt(), courseEnrollment.getUpdatedAt());
    }

    public int update(CourseEnrollment courseEnrollment) {
        String sql = "UPDATE course_enrollments SET status = ?, updatedAt = ? WHERE userId = ? AND courseId = ?";
        return jdbcTemplate.update(sql, courseEnrollment.getStatus(), courseEnrollment.getUpdatedAt(),
                courseEnrollment.getUserId(), courseEnrollment.getCourseId());
    }

    public int deleteById(Long userId, Long courseId) {
        String sql = "DELETE FROM course_enrollments WHERE userId = ? AND courseId = ?";
        return jdbcTemplate.update(sql, userId, courseId);
    }
}
