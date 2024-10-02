package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // Create a new user
    public void saveUser(User user) {
        String sql = "INSERT INTO users (username, password, email, phone_number, date_of_birth, gender, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getEmail(), user.getPhoneNumber(), user.getDateOfBirth(), user.getGender(), user.getCreatedAt(), user.getUpdatedAt());
    }

    // Find user by username
    public User findByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToUser, username);
    }

    // Update user details
    public void updateUser(User user) {
        String sql = "UPDATE users SET password = ?, email = ?, phone_number = ?, date_of_birth = ?, gender = ?, updated_at = ? WHERE id = ?";
        jdbcTemplate.update(sql, user.getPassword(), user.getEmail(), user.getPhoneNumber(), user.getDateOfBirth(), user.getGender(), user.getUpdatedAt(), user.getUserId());
    }

    // Delete user by ID
    public void deleteUser(Long userId) {
        String sql = "DELETE FROM users WHERE id = ?";
        jdbcTemplate.update(sql, userId);
    }

    // Get all users
    public List<User> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    private User mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        return new User(
                rs.getLong("id"),
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("email"),
                rs.getString("phone_number"),
                rs.getDate("date_of_birth").toLocalDate().atStartOfDay(),
                rs.getString("gender"),
                rs.getTimestamp("created_at").toLocalDateTime(),
                rs.getTimestamp("updated_at").toLocalDateTime()
        );
    }
}
