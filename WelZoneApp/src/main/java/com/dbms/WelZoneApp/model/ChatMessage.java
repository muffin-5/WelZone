package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private Long id;
    private Long sessionId;  // This is linked to a slot (session)
    private Long senderId;   // The sender, which could be either a user or counselor
    private String senderType;  // 'USER' or 'COUNSELOR'
    private String message;
    private LocalDateTime timestamp;
}
