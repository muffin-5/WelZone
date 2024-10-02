package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.User;
import com.dbms.WelZoneApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create a new user
    public void registerUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.saveUser(user);
    }

    // Find user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Update user
    public void updateUser(User user) {
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.updateUser(user);
    }

    // Delete user
    public void deleteUser(Long userId) {
        userRepository.deleteUser(userId);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }
}
