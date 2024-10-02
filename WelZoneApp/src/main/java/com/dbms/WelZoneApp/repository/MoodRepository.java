package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Mood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class MoodRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String FIND_ALL_MOODS_SQL = "SELECT * FROM moods";
    private static final String FIND_MOOD_BY_ID_SQL = "SELECT * FROM moods WHERE id = ?";

    public List<Mood> findAllMoods() {
        return jdbcTemplate.query(FIND_ALL_MOODS_SQL, new MoodRowMapper());
    }

    public Mood findMoodById(Long id) {
        return jdbcTemplate.queryForObject(FIND_MOOD_BY_ID_SQL, new Object[]{id}, new MoodRowMapper());
    }

    private static class MoodRowMapper implements RowMapper<Mood> {
        @Override
        public Mood mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Mood(rs.getLong("id"), rs.getString("mood_type"));
        }
    }
}
