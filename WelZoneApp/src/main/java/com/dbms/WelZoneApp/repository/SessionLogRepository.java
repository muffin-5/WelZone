package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.SessionLog;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SessionLogRepository {

    private final JdbcTemplate jdbcTemplate;

    public SessionLogRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Find all session logs
    public List<SessionLog> findAll() {
        String sql = "SELECT * FROM session_logs";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            SessionLog sessionLog = new SessionLog();
            sessionLog.setLogId(rs.getLong("logId"));
            sessionLog.setSessionId(rs.getLong("sessionId"));
            sessionLog.setLogTime(rs.getTimestamp("log_time").toLocalDateTime());
            sessionLog.setLogDetails(rs.getString("log_details"));
            return sessionLog;
        });
    }

    // Find session log by logId
    public SessionLog findById(Long logId) {
        String sql = "SELECT * FROM session_logs WHERE logId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{logId}, (rs, rowNum) -> {
            SessionLog sessionLog = new SessionLog();
            sessionLog.setLogId(rs.getLong("logId"));
            sessionLog.setSessionId(rs.getLong("sessionId"));
            sessionLog.setLogTime(rs.getTimestamp("log_time").toLocalDateTime());
            sessionLog.setLogDetails(rs.getString("log_details"));
            return sessionLog;
        });
    }

    // Save a new session log
    public void save(SessionLog sessionLog) {
        String sql = "INSERT INTO session_logs (sessionId, log_time, log_details) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, sessionLog.getSessionId(), sessionLog.getLogTime(), sessionLog.getLogDetails());
    }

    // Update an existing session log
    public void update(SessionLog sessionLog) {
        String sql = "UPDATE session_logs SET sessionId = ?, log_time = ?, log_details = ? WHERE logId = ?";
        jdbcTemplate.update(sql, sessionLog.getSessionId(), sessionLog.getLogTime(), sessionLog.getLogDetails(), sessionLog.getLogId());
    }

    // Delete a session log
    public void delete(Long logId) {
        String sql = "DELETE FROM session_logs WHERE logId = ?";
        jdbcTemplate.update(sql, logId);
    }
}
