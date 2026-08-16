package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.ChatMessage;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class ChatMessageRepository {

    private final JdbcTemplate jdbcTemplate;

    public ChatMessageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Save a chat message and return the persisted entity (with generated id)
    public ChatMessage save(ChatMessage chatMessage) {
        String sql = "INSERT INTO chat_messages (session_id, sender_id, sender_type, message, timestamp) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, chatMessage.getSessionId());
            ps.setLong(2, chatMessage.getSenderId());
            ps.setString(3, chatMessage.getSenderType());
            ps.setString(4, chatMessage.getMessage());
            ps.setObject(5, chatMessage.getTimestamp());
            return ps;
        }, keyHolder);
        Number key = keyHolder.getKey();
        chatMessage.setId(key != null ? key.longValue() : null);
        return chatMessage;
    }

    // Get chat messages by session
    public List<ChatMessage> getBySessionId(Long sessionId) {
        String sql = "SELECT * FROM chat_messages WHERE session_id = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapRowToChatMessage(rs), sessionId);
    }

    // Map a ResultSet to a ChatMessage
    private ChatMessage mapRowToChatMessage(ResultSet rs) throws SQLException {
        return new ChatMessage(
                rs.getLong("id"),
                rs.getLong("session_id"),
                rs.getLong("sender_id"),
                rs.getString("sender_type"),
                rs.getString("message"),
                rs.getTimestamp("timestamp").toLocalDateTime()
        );
    }
}
