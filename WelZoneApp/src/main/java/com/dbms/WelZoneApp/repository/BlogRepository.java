package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.BlogPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class BlogRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // SQL queries
    private static final String INSERT_BLOG_POST_SQL = "INSERT INTO blog_posts (counselor_id, title, content) VALUES (?, ?, ?)";
    private static final String FIND_BLOG_POST_BY_ID_SQL = "SELECT * FROM blog_posts WHERE id = ?";
    private static final String FIND_ALL_BLOG_POSTS_SQL = "SELECT * FROM blog_posts";
    private static final String FIND_BLOG_POSTS_BY_COUNSELOR_SQL = "SELECT * FROM blog_posts WHERE counselor_id = ?";

    // Method to create a blog post
    public void createBlogPost(BlogPost blogPost) {
        jdbcTemplate.update(INSERT_BLOG_POST_SQL, blogPost.getCounselorId(), blogPost.getTitle(), blogPost.getContent());
    }

    // Method to find a blog post by ID
    public BlogPost findBlogPostById(Long id) {
        return jdbcTemplate.queryForObject(FIND_BLOG_POST_BY_ID_SQL, new Object[]{id}, new BlogPostRowMapper());
    }

    // Method to find all blog posts
    public List<BlogPost> findAllBlogPosts() {
        return jdbcTemplate.query(FIND_ALL_BLOG_POSTS_SQL, new BlogPostRowMapper());
    }

    // Method to find blog posts by counselor ID
    public List<BlogPost> findBlogPostsByCounselorId(Long counselorId) {
        return jdbcTemplate.query(FIND_BLOG_POSTS_BY_COUNSELOR_SQL, new Object[]{counselorId}, new BlogPostRowMapper());
    }

    // RowMapper for BlogPost model
    private static class BlogPostRowMapper implements RowMapper<BlogPost> {
        @Override
        public BlogPost mapRow(ResultSet rs, int rowNum) throws SQLException {
            BlogPost blogPost = new BlogPost();
            blogPost.setId(rs.getLong("id"));
            blogPost.setCounselorId(rs.getLong("counselor_id"));
            blogPost.setTitle(rs.getString("title"));
            blogPost.setContent(rs.getString("content"));
            blogPost.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            return blogPost;
        }
    }
}

