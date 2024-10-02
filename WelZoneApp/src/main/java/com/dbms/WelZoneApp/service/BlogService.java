package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.BlogPost;
import com.dbms.WelZoneApp.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // Create a new blog post
    public void createBlogPost(BlogPost blogPost) {
        blogRepository.createBlogPost(blogPost);
    }

    // Find a blog post by ID
    public BlogPost findBlogPostById(Long id) {
        return blogRepository.findBlogPostById(id);
    }

    // Find all blog posts
    public List<BlogPost> findAllBlogPosts() {
        return blogRepository.findAllBlogPosts();
    }

    // Find blog posts by a specific counselor
    public List<BlogPost> findBlogPostsByCounselorId(Long counselorId) {
        return blogRepository.findBlogPostsByCounselorId(counselorId);
    }
}

