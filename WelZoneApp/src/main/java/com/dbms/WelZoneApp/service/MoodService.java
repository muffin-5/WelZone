package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Mood;
import com.dbms.WelZoneApp.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoodService {

    @Autowired
    private MoodRepository moodRepository;

    public List<Mood> getAllMoods() {
        return moodRepository.findAllMoods();
    }

    public Mood getMoodById(Long id) {
        return moodRepository.findMoodById(id);
    }
}
