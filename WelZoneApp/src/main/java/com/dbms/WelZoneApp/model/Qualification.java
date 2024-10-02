package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Qualification {
    private Long qualificationId; // Qualification ID
    private Long counselorId;      // ID of the counselor this qualification relates to
    private String qualification;   // Qualification text
}
