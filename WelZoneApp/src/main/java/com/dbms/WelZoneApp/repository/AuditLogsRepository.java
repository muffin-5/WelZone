package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.AuditLogs;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
            auditLog.setAction(rs.getString("action"));
            auditLog.setTimestamp(rs.getTimestamp("timestamp").toLocalDateTime());
            auditLog.setDetails(rs.getString("details"));
            return auditLog;
        });
    }

    public void save(AuditLogs auditLog) {
        String sql = "INSERT INTO audit_logs (userId, action, timestamp, details) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, auditLog.getUserId(), auditLog.getAction(), auditLog.getTimestamp(), auditLog.getDetails());
    }

    public void update(AuditLogs auditLog) {
        String sql = "UPDATE audit_logs SET userId = ?, action = ?, timestamp = ?, details = ? WHERE auditId = ?";
        jdbcTemplate.update(sql, auditLog.getUserId(), auditLog.getAction(), auditLog.getTimestamp(), auditLog.getDetails(), auditLog.getAuditId());
    }

    public void delete(Long auditId) {
        String sql = "DELETE FROM audit_logs WHERE auditId = ?";
        jdbcTemplate.update(sql, auditId);
    }
}
