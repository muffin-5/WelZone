package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.BlogReading;
import com.dbms.WelZoneApp.repository.BlogReadingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogReadingService {
    private final BlogReadingRepository blogReadingRepository;

    public BlogReadingService(BlogReadingRepository blogReadingRepository) {
        this.blogReadingRepository = blogReadingRepository;
    }

    public List<BlogReading> getAllBlogReadings() {
        return blogReadingRepository.findAll();
    }

    public BlogReading getBlogReadingById(Long blogId, Long userId) {
        return blogReadingRepository.findById(blogId, userId);
    }

    public void addBlogReading(BlogReading blogReading) {
        blogReadingRepository.save(blogReading);
    }

    public void updateBlogReading(BlogReading blogReading) {
        blogReadingRepository.update(blogReading);
    }

    public void deleteBlogReading(Long blogId, Long userId) {
        blogReadingRepository.delete(blogId, userId);
    }
}
