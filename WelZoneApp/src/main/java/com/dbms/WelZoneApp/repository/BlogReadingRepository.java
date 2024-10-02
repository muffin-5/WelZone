package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.BlogReading;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BlogReadingRepository {
    private final JdbcTemplate jdbcTemplate;

    public BlogReadingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<BlogReading> findAll() {
        String sql = "SELECT * FROM blog_readings";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            BlogReading blogReading = new BlogReading();
            blogReading.setBlogId(rs.getLong("blogId"));
            blogReading.setUserId(rs.getLong("userId"));
            blogReading.setTime(rs.getLong("time"));
            return blogReading;
        });
    }

    public BlogReading findById(Long blogId, Long userId) {
        String sql = "SELECT * FROM blog_readings WHERE blogId = ? AND userId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{blogId, userId}, (rs, rowNum) -> {
            BlogReading blogReading = new BlogReading();
            blogReading.setBlogId(rs.getLong("blogId"));
            blogReading.setUserId(rs.getLong("userId"));
            blogReading.setTime(rs.getLong("time"));
            return blogReading;
        });
    }

    public void save(BlogReading blogReading) {
        String sql = "INSERT INTO blog_readings (blogId, userId, time) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, blogReading.getBlogId(), blogReading.getUserId(), blogReading.getTime());
    }

    public void update(BlogReading blogReading) {
        String sql = "UPDATE blog_readings SET time = ? WHERE blogId = ? AND userId = ?";
        jdbcTemplate.update(sql, blogReading.getTime(), blogReading.getBlogId(), blogReading.getUserId());
    }

    public void delete(Long blogId, Long userId) {
        String sql = "DELETE FROM blog_readings WHERE blogId = ? AND userId = ?";
        jdbcTemplate.update(sql, blogId, userId);
    }
}
