package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.CourseEnrollment;
import com.dbms.WelZoneApp.service.CourseEnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class CourseEnrollmentController {

    private final CourseEnrollmentService courseEnrollmentService;

    public CourseEnrollmentController(CourseEnrollmentService courseEnrollmentService) {
        this.courseEnrollmentService = courseEnrollmentService;
    }

    @GetMapping
    public List<CourseEnrollment> getAllEnrollments() {
        return courseEnrollmentService.getAllEnrollments();
    }

    @GetMapping("/{userId}/{courseId}")
    public ResponseEntity<CourseEnrollment> getEnrollmentById(@PathVariable Long userId, @PathVariable Long courseId) {
        CourseEnrollment enrollment = courseEnrollmentService.getEnrollmentById(userId, courseId);
        if (enrollment != null) {
            return ResponseEntity.ok(enrollment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createEnrollment(@RequestBody CourseEnrollment courseEnrollment) {
        courseEnrollmentService.createEnrollment(courseEnrollment);
        return ResponseEntity.ok("Enrollment created successfully!");
    }

    @PutMapping("/{userId}/{courseId}")
    public ResponseEntity<String> updateEnrollment(@PathVariable Long userId, @PathVariable Long courseId, @RequestBody CourseEnrollment courseEnrollment) {
        courseEnrollment.setUserId(userId);
        courseEnrollment.setCourseId(courseId);
        courseEnrollmentService.updateEnrollment(courseEnrollment);
        return ResponseEntity.ok("Enrollment updated successfully!");
    }

    @DeleteMapping("/{userId}/{courseId}")
    public ResponseEntity<String> deleteEnrollment(@PathVariable Long userId, @PathVariable Long courseId) {
        courseEnrollmentService.deleteEnrollment(userId, courseId);
        return ResponseEntity.ok("Enrollment deleted successfully!");
    }
}
