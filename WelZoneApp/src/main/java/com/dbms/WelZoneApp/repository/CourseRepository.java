package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Course;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CourseRepository {

    private final JdbcTemplate jdbcTemplate;

    public CourseRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper to map rows of a ResultSet to Course objects
    private RowMapper<Course> courseRowMapper = (rs, rowNum) -> new Course(
            rs.getLong("courseId"),
            rs.getString("title"),
            rs.getString("description"),
            rs.getDouble("price"),
            rs.getTimestamp("createdAt").toLocalDateTime(),
            rs.getTimestamp("updatedAt").toLocalDateTime()
    );

    // CRUD Operations
    public List<Course> findAll() {
        String sql = "SELECT * FROM courses";
        return jdbcTemplate.query(sql, courseRowMapper);
    }

    public Course findById(Long id) {
        String sql = "SELECT * FROM courses WHERE courseId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, courseRowMapper);
    }

    public int save(Course course) {
        String sql = "INSERT INTO courses (title, description, price, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, course.getTitle(), course.getDescription(), course.getPrice(), course.getCreatedAt(), course.getUpdatedAt());
    }

    public int update(Course course) {
        String sql = "UPDATE courses SET title = ?, description = ?, price = ?, updatedAt = ? WHERE courseId = ?";
        return jdbcTemplate.update(sql, course.getTitle(), course.getDescription(), course.getPrice(), course.getUpdatedAt(), course.getCourseId());
    }

    public int deleteById(Long id) {
        String sql = "DELETE FROM courses WHERE courseId = ?";
        return jdbcTemplate.update(sql, id);
    }
}
