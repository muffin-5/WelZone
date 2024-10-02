package com.dbms.WelZoneApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMood {
    private Long id;
    private Long userId;
    private Long moodId;
    private LocalDateTime moodSetAt;
}
