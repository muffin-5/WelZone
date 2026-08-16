package com.dbms.WelZoneApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypingEvent {
    private Long sessionId;
    private Long senderId;
    private String senderType;
    private boolean typing;
}