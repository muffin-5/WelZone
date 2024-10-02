package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.CourseLog;
import com.dbms.WelZoneApp.repository.CourseLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseLogService {
    private final CourseLogRepository courseLogRepository;

    public CourseLogService(CourseLogRepository courseLogRepository) {
        this.courseLogRepository = courseLogRepository;
    }

    public List<CourseLog> getAllCourseLogs() {
        return courseLogRepository.findAll();
    }

    public CourseLog getCourseLog(Long auditId, Long courseId) {
        return courseLogRepository.findById(auditId, courseId);
    }

    public void addCourseLog(CourseLog courseLog) {
        courseLogRepository.save(courseLog);
    }

    public void removeCourseLog(Long auditId, Long courseId) {
        courseLogRepository.delete(auditId, courseId);
    }
}
