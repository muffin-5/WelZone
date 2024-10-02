package com.dbms.WelZoneApp.repository;

import com.dbms.WelZoneApp.model.ChatMessage;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ChatMessageRepository {

    private final JdbcTemplate jdbcTemplate;

    public ChatMessageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Save a chat message
    public int save(ChatMessage chatMessage) {
        String sql = "INSERT INTO chat_messages (session_id, sender_id, sender_type, message, timestamp) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                chatMessage.getSessionId(),
                chatMessage.getSenderId(),
                chatMessage.getSenderType(),
                chatMessage.getMessage(),
                chatMessage.getTimestamp());
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
