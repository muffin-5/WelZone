package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    private Long courseId;
    private String title;
    private String description;
    private double price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
