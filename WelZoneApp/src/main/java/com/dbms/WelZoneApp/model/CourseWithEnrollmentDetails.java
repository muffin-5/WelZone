package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseWithEnrollmentDetails {
    private Long userId;
    private Long courseId;
    private LocalDateTime enrollmentDate;
    private String status;            // Status of enrollment (e.g., "active", "completed", etc.)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String title;
    private String description;
    private double price;
}
