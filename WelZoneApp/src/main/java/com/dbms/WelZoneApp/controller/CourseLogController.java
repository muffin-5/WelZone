package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.CourseLog;
import com.dbms.WelZoneApp.service.CourseLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course-log")
public class CourseLogController {
    private final CourseLogService courseLogService;

    public CourseLogController(CourseLogService courseLogService) {
        this.courseLogService = courseLogService;
    }

    @GetMapping
    public ResponseEntity<List<CourseLog>> getAllCourseLogs() {
        return ResponseEntity.ok(courseLogService.getAllCourseLogs());
    }

    @GetMapping("/{auditId}/{courseId}")
    public ResponseEntity<CourseLog> getCourseLog(@PathVariable Long auditId, @PathVariable Long courseId) {
        CourseLog courseLog = courseLogService.getCourseLog(auditId, courseId);
        return courseLog != null ? ResponseEntity.ok(courseLog) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Void> createCourseLog(@RequestBody CourseLog courseLog) {
        courseLogService.addCourseLog(courseLog);
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("/{auditId}/{courseId}")
    public ResponseEntity<Void> deleteCourseLog(@PathVariable Long auditId, @PathVariable Long courseId) {
        courseLogService.removeCourseLog(auditId, courseId);
        return ResponseEntity.noContent().build();
    }
}
