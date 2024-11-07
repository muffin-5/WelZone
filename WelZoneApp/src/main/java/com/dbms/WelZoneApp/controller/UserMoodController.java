package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.UserMood;
import com.dbms.WelZoneApp.service.UserMoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-moods")
public class UserMoodController {

    @Autowired
    private UserMoodService userMoodService;

    // Create new user mood
    @PostMapping("/set")
    public ResponseEntity<String> setUserMood(@RequestParam Long userId, @RequestParam Long moodId) {
        userMoodService.createUserMood(userId, moodId);
        return ResponseEntity.ok("User mood set successfully.");
    }

    // Get user moods by user ID
    @GetMapping("/{userId}")
    public List<UserMood> getUserMoodsByUserId(@PathVariable Long userId) {
        return userMoodService.getUserMoodsByUserId(userId);
    }
}
