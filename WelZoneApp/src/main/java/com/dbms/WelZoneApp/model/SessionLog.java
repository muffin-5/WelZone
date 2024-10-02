package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionLog {
    private Long logId;
    private Long sessionId;
    private LocalDateTime logTime;
    private String logDetails;
}
