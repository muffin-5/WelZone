package com.dbms.WelZoneApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotWithUserDetails {
    private Long slotId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean booked;
    private Long counselorId;
    private Long userId;
    private String userName;
}