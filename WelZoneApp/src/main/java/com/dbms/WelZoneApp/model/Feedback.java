package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    private Long feedbackId;    // Feedback ID
    private Long sessionId;     // ID of the session (slot) this feedback relates to
    private int rating;         // Rating given by the user
    private String comments;     // Comments provided by the user
    private LocalDateTime createdAt; // Feedback creation timestamp
    private LocalDateTime updatedAt; // Feedback update timestamp
}
