package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.CourseEnrollment;
import com.dbms.WelZoneApp.repository.CourseEnrollmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CourseEnrollmentService {

    private final CourseEnrollmentRepository courseEnrollmentRepository;

    public CourseEnrollmentService(CourseEnrollmentRepository courseEnrollmentRepository) {
        this.courseEnrollmentRepository = courseEnrollmentRepository;
    }

    public List<CourseEnrollment> getAllEnrollments() {
        return courseEnrollmentRepository.findAll();
    }

    public CourseEnrollment getEnrollmentById(Long userId, Long courseId) {
        return courseEnrollmentRepository.findById(userId, courseId);
    }

    public void createEnrollment(CourseEnrollment courseEnrollment) {
        courseEnrollment.setCreatedAt(LocalDateTime.now());
        courseEnrollment.setUpdatedAt(LocalDateTime.now());
        courseEnrollmentRepository.save(courseEnrollment);
    }

    public void updateEnrollment(CourseEnrollment courseEnrollment) {
        courseEnrollment.setUpdatedAt(LocalDateTime.now());
        courseEnrollmentRepository.update(courseEnrollment);
    }

    public void deleteEnrollment(Long userId, Long courseId) {
        courseEnrollmentRepository.deleteById(userId, courseId);
    }
}
