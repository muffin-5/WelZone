package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPost {
    private Long id;
    private Long counselorId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
