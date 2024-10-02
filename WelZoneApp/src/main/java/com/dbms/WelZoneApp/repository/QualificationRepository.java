package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Qualification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QualificationRepository {
    private final JdbcTemplate jdbcTemplate;

    public QualificationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Qualification> findAll() {
        String sql = "SELECT * FROM qualifications";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Qualification qualification = new Qualification();
            qualification.setQualificationId(rs.getLong("qualificationId"));
            qualification.setCounselorId(rs.getLong("counselorId"));
            qualification.setQualification(rs.getString("qualification"));
            return qualification;
        });
    }

    public Qualification findById(Long qualificationId) {
        String sql = "SELECT * FROM qualifications WHERE qualificationId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{qualificationId}, (rs, rowNum) -> {
            Qualification qualification = new Qualification();
            qualification.setQualificationId(rs.getLong("qualificationId"));
            qualification.setCounselorId(rs.getLong("counselorId"));
            qualification.setQualification(rs.getString("qualification"));
            return qualification;
        });
    }

    public void save(Qualification qualification) {
        String sql = "INSERT INTO qualifications (counselorId, qualification) VALUES (?, ?)";
        jdbcTemplate.update(sql, qualification.getCounselorId(), qualification.getQualification());
    }

    public void update(Qualification qualification) {
        String sql = "UPDATE qualifications SET counselorId = ?, qualification = ? WHERE qualificationId = ?";
        jdbcTemplate.update(sql, qualification.getCounselorId(), qualification.getQualification(), qualification.getQualificationId());
    }

    public void delete(Long qualificationId) {
        String sql = "DELETE FROM qualifications WHERE qualificationId = ?";
        jdbcTemplate.update(sql, qualificationId);
    }
}
