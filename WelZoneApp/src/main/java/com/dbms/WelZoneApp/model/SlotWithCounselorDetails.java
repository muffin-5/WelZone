package com.dbms.WelZoneApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotWithCounselorDetails {
    private Long slotId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean booked;
    private Long counselorId;
    private String counselorName;
    private int experience;
    private String qualification;  // Existing field
    private String specialization;  // New field added
    private double rating;
}
