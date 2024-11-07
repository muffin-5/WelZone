package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Course;
import com.dbms.WelZoneApp.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public void createCourse(Course course) {
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());
        courseRepository.save(course);
    }

    public void updateCourse(Course course) {
        course.setUpdatedAt(LocalDateTime.now());
        courseRepository.update(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
