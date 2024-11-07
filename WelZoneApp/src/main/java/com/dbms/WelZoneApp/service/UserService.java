package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.User;
import com.dbms.WelZoneApp.repository.UserRepository;
<<<<<<< HEAD
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
>>>>>>> 46737418a34eb6d8b03160ee99bc0af28e9380fe
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
<<<<<<< HEAD

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
=======
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JWTService jwtService;

    @Autowired
    public UserService(UserRepository userRepository,PasswordEncoder encoder,AuthenticationManager authManager,JWTService jwtService) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.authManager=authManager;
        this.jwtService=jwtService;
>>>>>>> 46737418a34eb6d8b03160ee99bc0af28e9380fe
    }

    // Create a new user
    public void registerUser(User user) {
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
<<<<<<< HEAD
=======
        user.setPassword(encoder.encode(user.getPassword()));
>>>>>>> 46737418a34eb6d8b03160ee99bc0af28e9380fe
        userRepository.saveUser(user);
    }

    // Authenticate user
    public boolean authenticateUser(String username, String password) {
<<<<<<< HEAD
        return userRepository.verifyUserCredentials(username, password);
=======
        User user=userRepository.findByUsername(username);
        if (user != null) {
            // Compare the entered password with the hashed password stored in the database
            return encoder.matches(password, user.getPassword());
        }
        return false;
//        return userRepository.verifyUserCredentials(username, password);
    }

    public String verify(User user){
        Authentication authentication=authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "false";
>>>>>>> 46737418a34eb6d8b03160ee99bc0af28e9380fe
    }

    // Find user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Find user by userId
    public User getUserById(Long userId) {
        return userRepository.findById(userId);
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
