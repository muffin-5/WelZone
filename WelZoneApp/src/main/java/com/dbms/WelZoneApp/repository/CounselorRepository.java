package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Counselor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CounselorRepository {

    private final JdbcTemplate jdbcTemplate;

    public CounselorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Counselor counselor) {
        String sql = "INSERT INTO counselors (username, password, email, phone, date_of_birth, specialization, qualification, experience, rating, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, counselor.getUsername(), counselor.getPassword(), counselor.getEmail(), counselor.getPhone(),
                counselor.getDateOfBirth(), counselor.getSpecialization(), counselor.getQualification(), counselor.getExperience(),
                counselor.getRating(), counselor.getCreatedAt(), counselor.getUpdatedAt());
    }

    public Counselor findByUsername(String username) {
        String sql = "SELECT * FROM counselors WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, this::mapRowToCounselor);
    }


    public List<Counselor> findAll() {
        String sql = "SELECT * FROM counselors";
        return jdbcTemplate.query(sql, this::mapRowToCounselor);
    }

    public Counselor findById(Long counselorId) {
        String sql = "SELECT * FROM counselors WHERE counselor_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{counselorId}, this::mapRowToCounselor);
    }

    public void update(Counselor counselor) {
        String sql = "UPDATE counselors SET username = ?, password = ?, email = ?, phone = ?, date_of_birth = ?, specialization = ?, qualification = ?, experience = ?, rating = ?, updated_at = ? WHERE counselor_id = ?";
        jdbcTemplate.update(sql, counselor.getUsername(), counselor.getPassword(), counselor.getEmail(), counselor.getPhone(),
                counselor.getDateOfBirth(), counselor.getSpecialization(), counselor.getQualification(), counselor.getExperience(),
                counselor.getRating(), counselor.getUpdatedAt(), counselor.getCounselorId());
    }

    public void delete(Long counselorId) {
        String sql = "DELETE FROM counselors WHERE counselor_id = ?";
        jdbcTemplate.update(sql, counselorId);
    }

    // Method to verify counselor credentials
    public boolean verifyCounselorCredentials(String username, String password) {
        String sql = "SELECT COUNT(*) FROM counselors WHERE username = ? AND password = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, username, password);
        return count != null && count > 0;
    }

    private Counselor mapRowToCounselor(ResultSet rs, int rowNum) throws SQLException {
        return new Counselor(
                rs.getLong("counselor_id"),
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("email"),
                rs.getString("phone"),
                rs.getDate("date_of_birth").toLocalDate().atStartOfDay(),
                rs.getString("specialization"),
                rs.getString("qualification"),
                rs.getInt("experience"),
                rs.getDouble("rating"),
                rs.getTimestamp("created_at").toLocalDateTime(),
                rs.getTimestamp("updated_at").toLocalDateTime()
        );
    }
}
