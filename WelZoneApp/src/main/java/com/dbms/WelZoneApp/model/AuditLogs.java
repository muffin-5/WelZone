package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogs {
    private Long auditId;
    private Long userId;
    private String action;
    private LocalDateTime timestamp;
    private String details;
}
