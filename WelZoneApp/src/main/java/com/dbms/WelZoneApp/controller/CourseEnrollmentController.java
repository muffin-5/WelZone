package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.CourseEnrollment;
import com.dbms.WelZoneApp.model.CourseWithEnrollmentDetails;
import com.dbms.WelZoneApp.service.CourseEnrollmentService;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/{userId}")
    public ResponseEntity<List<CourseWithEnrollmentDetails>> getEnrollmentById(@PathVariable Long userId) {
        List<CourseWithEnrollmentDetails> enrollments = courseEnrollmentService.getEnrollmentById(userId);
        if (!enrollments.isEmpty()) {
            return ResponseEntity.ok(enrollments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createEnrollment(@RequestBody CourseEnrollment courseEnrollment) {
        try {
            courseEnrollmentService.createEnrollment(courseEnrollment);
            return ResponseEntity.ok("Enrollment created successfully!");
        } catch (Exception e) {
            // Log error details
            System.err.println("Error occurred during enrollment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create enrollment.");
        }
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
