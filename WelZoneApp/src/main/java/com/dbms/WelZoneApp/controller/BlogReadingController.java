package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.BlogReading;
import com.dbms.WelZoneApp.service.BlogReadingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog-readings")
public class BlogReadingController {
    private final BlogReadingService blogReadingService;

    public BlogReadingController(BlogReadingService blogReadingService) {
        this.blogReadingService = blogReadingService;
    }

    @GetMapping
    public List<BlogReading> getAllBlogReadings() {
        return blogReadingService.getAllBlogReadings();
    }

    @GetMapping("/{blogId}/{userId}")
    public BlogReading getBlogReadingById(@PathVariable("blogId") Long blogId, @PathVariable("userId") Long userId) {
        return blogReadingService.getBlogReadingById(blogId, userId);
    }

    @PostMapping
    public void addBlogReading(@RequestBody BlogReading blogReading) {
        blogReadingService.addBlogReading(blogReading);
    }

    @PutMapping("/{blogId}/{userId}")
    public void updateBlogReading(@PathVariable("blogId") Long blogId, @PathVariable("userId") Long userId, @RequestBody BlogReading blogReading) {
        blogReading.setBlogId(blogId);
        blogReading.setUserId(userId);
        blogReadingService.updateBlogReading(blogReading);
    }

    @DeleteMapping("/{blogId}/{userId}")
    public void deleteBlogReading(@PathVariable("blogId") Long blogId, @PathVariable("userId") Long userId) {
        blogReadingService.deleteBlogReading(blogId, userId);
    }
}
