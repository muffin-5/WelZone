package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.DailyMoodLog;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DailyMoodLogRepository {

    private final JdbcTemplate jdbcTemplate;

    public DailyMoodLogRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Find all daily mood logs
    public List<DailyMoodLog> findAll() {
        String sql = "SELECT * FROM daily_mood_log";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            DailyMoodLog dailyMoodLog = new DailyMoodLog();
            dailyMoodLog.setMoodId(rs.getLong("mood_id"));
            dailyMoodLog.setAuditId(rs.getLong("auditId"));
            return dailyMoodLog;
        });
    }

    // Find daily mood log by moodId
    public DailyMoodLog findById(Long moodId, Long auditId) {
        String sql = "SELECT * FROM daily_mood_log WHERE mood_id = ? AND auditId = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{moodId, auditId}, (rs, rowNum) -> {
            DailyMoodLog dailyMoodLog = new DailyMoodLog();
            dailyMoodLog.setMoodId(rs.getLong("mood_id"));
            dailyMoodLog.setAuditId(rs.getLong("auditId"));
            return dailyMoodLog;
        });
    }

    // Save a new daily mood log
    public void save(DailyMoodLog dailyMoodLog) {
        String sql = "INSERT INTO daily_mood_log (mood_id, auditId) VALUES (?, ?)";
        jdbcTemplate.update(sql, dailyMoodLog.getMoodId(), dailyMoodLog.getAuditId());
    }

    // Update an existing daily mood log
    public void update(DailyMoodLog dailyMoodLog) {
        String sql = "UPDATE daily_mood_log SET auditId = ? WHERE mood_id = ?";
        jdbcTemplate.update(sql, dailyMoodLog.getAuditId(), dailyMoodLog.getMoodId());
    }

    // Delete a daily mood log
    public void delete(Long moodId, Long auditId) {
        String sql = "DELETE FROM daily_mood_log WHERE mood_id = ? AND auditId = ?";
        jdbcTemplate.update(sql, moodId, auditId);
    }
}
