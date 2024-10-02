package com.dbms.WelZoneApp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseLog {
    private Long auditId;
    private Long courseId;
}
