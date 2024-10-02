package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.BlogPost;
import com.dbms.WelZoneApp.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // Create a new blog post
    @PostMapping("/create")
    public ResponseEntity<String> createBlogPost(@RequestBody BlogPost blogPost) {
        blogService.createBlogPost(blogPost);
        return ResponseEntity.ok("Blog post created successfully.");
    }

    // Get a blog post by ID
    @GetMapping("/{id}")
    public BlogPost getBlogPostById(@PathVariable Long id) {
        return blogService.findBlogPostById(id);
    }

    // Get all blog posts
    @GetMapping("/all")
    public List<BlogPost> getAllBlogPosts() {
        return blogService.findAllBlogPosts();
    }

    // Get blog posts by counselor ID
    @GetMapping("/counselor/{counselorId}")
    public List<BlogPost> getBlogPostsByCounselor(@PathVariable Long counselorId) {
        return blogService.findBlogPostsByCounselorId(counselorId);
    }
}

