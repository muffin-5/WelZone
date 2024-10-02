package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Mood;
import com.dbms.WelZoneApp.service.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/moods")
public class MoodController {

    @Autowired
    private MoodService moodService;

    @GetMapping
    public List<Mood> getAllMoods() {
        return moodService.getAllMoods();
    }
}
