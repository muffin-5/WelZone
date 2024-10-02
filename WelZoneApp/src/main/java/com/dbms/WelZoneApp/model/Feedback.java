package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    private Long id;
    private Long userId;
    private Long counselorId;
    private Long slotId;
    private int rating;
    private String comment;
}
