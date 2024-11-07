package com.dbms.WelZoneApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Counselor {
    private Long counselorId;
    private String username;
    private String password;
    private String email;
    private String phone;
    private LocalDateTime dateOfBirth;
    private String specialization;
    private String qualification;
    private int experience; // in years
    private double rating; // for example out of 5
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
