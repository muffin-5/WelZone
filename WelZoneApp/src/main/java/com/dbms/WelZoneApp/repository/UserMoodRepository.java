package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.UserMood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserMoodRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String INSERT_USER_MOOD_SQL = "INSERT INTO user_mood (user_id, mood_id, mood_set_at) VALUES (?, ?, ?)";
    private static final String FIND_USER_MOOD_BY_USER_ID_SQL = "SELECT * FROM user_mood WHERE user_id = ?";

    public void createUserMood(UserMood userMood) {
        jdbcTemplate.update(INSERT_USER_MOOD_SQL, userMood.getUserId(), userMood.getMoodId(), userMood.getMoodSetAt());
    }

    public List<UserMood> findUserMoodByUserId(Long userId) {
        return jdbcTemplate.query(FIND_USER_MOOD_BY_USER_ID_SQL, new Object[]{userId}, new UserMoodRowMapper());
    }

    private static class UserMoodRowMapper implements RowMapper<UserMood> {
        @Override
        public UserMood mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new UserMood(rs.getLong("id"), rs.getLong("user_id"), rs.getLong("mood_id"), rs.getTimestamp("mood_set_at").toLocalDateTime());
        }
    }
}
