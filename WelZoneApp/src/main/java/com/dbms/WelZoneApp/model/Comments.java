package com.dbms.WelZoneApp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comments {
    private Long commentId;    // Comment ID
    private Long feedbackId;   // ID of the feedback this comment relates to
    private String comment;     // Comment text
}
