package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.AuditLogs;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class AuditLogsRepository {
    private final JdbcTemplate jdbcTemplate;

    public AuditLogsRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AuditLogs> findAll() {
        String sql = "SELECT * FROM audit_logs";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            AuditLogs auditLog = new AuditLogs();
            auditLog.setAuditId(rs.getLong("auditId"));
            auditLog.setUserId(rs.getLong("userId"));
            auditLog.setCouselorId(rs.getLong("counselorId"));
            auditLog.setAction(rs.getString("action"));
            auditLog.setTimestamp(rs.getTimestamp("timestamp").toLocalDateTime());
            auditLog.setDetails(rs.getString("details"));
            return auditLog;
        });
    }

    public AuditLogs findById(Long auditId) {
        String sql = "SELECT * FROM audit_logs WHERE auditId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{auditId}, (rs, rowNum) -> {
            AuditLogs auditLog = new AuditLogs();
            auditLog.setAuditId(rs.getLong("auditId"));
            auditLog.setUserId(rs.getLong("userId"));
            auditLog.setCouselorId(rs.getLong("counselorId"));
            auditLog.setAction(rs.getString("action"));
            auditLog.setTimestamp(rs.getTimestamp("timestamp").toLocalDateTime());
            auditLog.setDetails(rs.getString("details"));
            return auditLog;
        });
    }

    public AuditLogs save(AuditLogs auditLog) {
        String sql = "INSERT INTO audit_logs (userId, counselorId, action, timestamp, details) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            if (auditLog.getUserId() != null) {
                ps.setLong(1, auditLog.getUserId());
            } else {
                ps.setNull(1, java.sql.Types.BIGINT);
            }
            // Set `counselorId` conditionally
            if (auditLog.getCouselorId() != null) {
                ps.setLong(2, auditLog.getCouselorId());
            } else {
                ps.setNull(2, java.sql.Types.BIGINT);
            }


            ps.setString(3, auditLog.getAction());
            ps.setTimestamp(4, Timestamp.valueOf(auditLog.getTimestamp()));
            ps.setString(5, auditLog.getDetails());
            return ps;
        }, keyHolder);

        // Retrieve the generated key and set it to the auditLog object
        Long generatedId = keyHolder.getKey().longValue();
        auditLog.setAuditId(generatedId);

        return auditLog;
    }

    public void update(AuditLogs auditLog) {
        String sql = "UPDATE audit_logs SET userId = ?,counselorId= ?, action = ?, timestamp = ?, details = ? WHERE auditId = ?";
        jdbcTemplate.update(sql, auditLog.getUserId(),auditLog.getCouselorId(), auditLog.getAction(), auditLog.getTimestamp(), auditLog.getDetails(), auditLog.getAuditId());
    }

    public void delete(Long auditId) {
        String sql = "DELETE FROM audit_logs WHERE auditId = ?";
        jdbcTemplate.update(sql, auditId);
    }
}
