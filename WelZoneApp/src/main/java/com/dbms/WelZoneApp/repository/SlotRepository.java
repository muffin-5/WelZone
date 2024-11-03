package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.Slot;
import com.dbms.WelZoneApp.model.SlotWithCounselorDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class SlotRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // SQL queries
    private static final String INSERT_SLOT_SQL = "INSERT INTO slots (counselor_id, user_id, start_time, end_time, booked) VALUES (?, ?, ?, ?, ?)";
    private static final String FIND_SLOT_BY_ID_SQL = "SELECT * FROM slots WHERE id = ?";
    private static final String FIND_AVAILABLE_SLOTS_SQL = "SELECT * FROM slots WHERE counselor_id = ? AND booked = false AND end_time > ?";
    private static final String BOOK_SLOT_SQL = "UPDATE slots SET user_id = ?, booked = true WHERE id = ? AND booked = false";
    private static final String CANCEL_SLOT_SQL = "UPDATE slots SET user_id = NULL, booked = false WHERE id = ?";
    private static final String FIND_BOOKED_SLOTS_WITH_END_TIME_SQL =
            "SELECT * FROM slots WHERE counselor_id = ? AND booked = true AND end_time > ?";
    private static final String FIND_BOOKED_SLOTS_WITH_END_TIME_SQL_BY_USER =
            "SELECT * FROM slots WHERE user_id = ? AND booked = true AND end_time > ?";
    private static final String FIND_AVAILABLE_SLOTS_WITH_COUNSELOR_DETAILS_SQL =
            "SELECT s.id, s.start_time, s.end_time, s.booked, " +
                    "c.counselor_id, c.username, c.experience, c.qualification, c.specialization, c.rating " + // Updated query
                    "FROM slots s " +
                    "JOIN counselors c ON s.counselor_id = c.counselor_id " +
                    "WHERE s.booked = false AND s.end_time >= ?";

    // Method to create a slot
    public void createSlot(Slot slot) {
        jdbcTemplate.update(INSERT_SLOT_SQL, slot.getCounselorId(), slot.getUserId(), slot.getStartTime(), slot.getEndTime(), slot.isBooked());
    }

    // Method to find a slot by its ID
    public Slot findSlotById(Long id) {
        return jdbcTemplate.queryForObject(FIND_SLOT_BY_ID_SQL, new Object[]{id}, new SlotRowMapper());
    }

    // Method to find all available slots for a specific counselor
    public List<Slot> findAvailableSlots(Long counselorId, LocalDateTime currentTime) {
        return jdbcTemplate.query(FIND_AVAILABLE_SLOTS_SQL, new Object[]{counselorId, currentTime}, new SlotRowMapper());
    }

    // Method to book a slot
    public int bookSlot(Long slotId, Long userId) {
        return jdbcTemplate.update(BOOK_SLOT_SQL, userId, slotId);
    }

    // Method to cancel a slot booking
    public int cancelSlot(Long slotId) {
        return jdbcTemplate.update(CANCEL_SLOT_SQL, slotId);
    }

    // Method to find booked slots for a counselor with end_time greater than the current time
    public List<Slot> findBookedSlotsWithEndTime(Long counselorId, LocalDateTime currentTime) {
        return jdbcTemplate.query(
                FIND_BOOKED_SLOTS_WITH_END_TIME_SQL,
                new Object[]{counselorId, currentTime},
                new SlotRowMapper()
        );
    }

    // Method to find booked slots for a user with end_time greater than the current time
    public List<Slot> findBookedSlotsWithEndTimebyUser(Long userId, LocalDateTime currentTime) {
        return jdbcTemplate.query(
                FIND_BOOKED_SLOTS_WITH_END_TIME_SQL_BY_USER,
                new Object[]{userId, currentTime},
                new SlotRowMapper()
        );
    }

    // Method to find available slots with counselor details including specialization
    public List<SlotWithCounselorDetails> findAvailableSlotsWithCounselorDetails(LocalDateTime currentTime) {
        return jdbcTemplate.query(
                FIND_AVAILABLE_SLOTS_WITH_COUNSELOR_DETAILS_SQL,
                new Object[]{currentTime},
                new SlotWithCounselorDetailsRowMapper()
        );
    }

    // RowMapper for Slot model
    private static class SlotRowMapper implements RowMapper<Slot> {
        @Override
        public Slot mapRow(ResultSet rs, int rowNum) throws SQLException {
            Slot slot = new Slot();
            slot.setId(rs.getLong("id"));
            slot.setCounselorId(rs.getLong("counselor_id"));
            slot.setUserId(rs.getLong("user_id"));
            slot.setStartTime(rs.getTimestamp("start_time").toLocalDateTime());
            slot.setEndTime(rs.getTimestamp("end_time").toLocalDateTime());
            slot.setBooked(rs.getBoolean("booked"));
            return slot;
        }
    }

    private static class SlotWithCounselorDetailsRowMapper implements RowMapper<SlotWithCounselorDetails> {
        @Override
        public SlotWithCounselorDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
            SlotWithCounselorDetails slotDetails = new SlotWithCounselorDetails();
            slotDetails.setSlotId(rs.getLong("id"));
            slotDetails.setStartTime(rs.getTimestamp("start_time").toLocalDateTime());
            slotDetails.setEndTime(rs.getTimestamp("end_time").toLocalDateTime());
            slotDetails.setBooked(rs.getBoolean("booked"));
            slotDetails.setCounselorId(rs.getLong("counselor_id"));
            slotDetails.setCounselorName(rs.getString("username"));
            slotDetails.setExperience(rs.getInt("experience"));
            slotDetails.setQualification(rs.getString("qualification"));
            slotDetails.setSpecialization(rs.getString("specialization")); // Added specialization
            slotDetails.setRating(rs.getDouble("rating"));
            return slotDetails;
        }
    }
}
