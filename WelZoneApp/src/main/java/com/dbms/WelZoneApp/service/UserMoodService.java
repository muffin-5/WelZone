package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.UserMood;
import com.dbms.WelZoneApp.repository.UserMoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserMoodService {

    @Autowired
    private UserMoodRepository userMoodRepository;

    public void createUserMood(Long userId, Long moodId) {
        UserMood userMood = new UserMood();
        userMood.setUserId(userId);
        userMood.setMoodId(moodId);
        userMood.setMoodSetAt(LocalDateTime.now());

        userMoodRepository.createUserMood(userMood);
    }

    public List<UserMood> getUserMoodsByUserId(Long userId) {
        return userMoodRepository.findUserMoodByUserId(userId);
    }
}
