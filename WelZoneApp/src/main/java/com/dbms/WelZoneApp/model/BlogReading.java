package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogReading {
    private Long blogId; // ID of the blog that is being read
    private Long userId; // ID of the user who read the blog
    private Long time;   // Duration of time spent reading the blog in milliseconds
}
