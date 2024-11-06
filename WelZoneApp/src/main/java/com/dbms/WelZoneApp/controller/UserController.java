package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.User;
import com.dbms.WelZoneApp.repository.AuditLogsRepository;
import com.dbms.WelZoneApp.service.AuditLogsService;
import com.dbms.WelZoneApp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final AuditLogsService auditLogsService;

    public UserController(UserService userService, AuditLogsService auditLogsService) {
        this.userService = userService;
        this.auditLogsService=auditLogsService;
    }


    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.registerUser(user);
        auditLogsService.saveAuditLog(user.getUserId(),null,"Registered","User registered successfully");
        return ResponseEntity.ok("User registered successfully");
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginUser) {
        boolean isAuthenticated = userService.authenticateUser(loginUser.getUsername(), loginUser.getPassword());

        if (isAuthenticated) {
            User user = userService.getUserByUsername(loginUser.getUsername()); // Assuming this method exists


            Map<String, Object> response = new HashMap<>();
            response.put("message", "User logged in successfully!");
            response.put("userId", user.getUserId()); // Assuming you have a getUserId method
            response.put("whoLogged", "user");

            auditLogsService.saveAuditLog(user.getUserId(),null,"Logged In","User logged in successfully");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password!"));
        }
    }


    // Get user by username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    // Get user by userId
    @GetMapping("/id/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    // Update user
    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody User user) {
        user.setUserId(userId);
        userService.updateUser(user);
        auditLogsService.saveAuditLog(user.getUserId(),null,"Update","User updated successfully");
        return ResponseEntity.ok("User updated successfully");
    }

    // Delete user
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        User user=userService.getUserById(userId);
        auditLogsService.saveAuditLog(user.getUserId(),null,"Delete","User deleted successfully");
        return ResponseEntity.ok("User deleted successfully");
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
