package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Slot {
    private Long id;
    private Long counselorId;
    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean booked;
}
