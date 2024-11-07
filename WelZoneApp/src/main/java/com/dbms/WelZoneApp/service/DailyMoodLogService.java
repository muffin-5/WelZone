package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.DailyMoodLog;
import com.dbms.WelZoneApp.repository.DailyMoodLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyMoodLogService {

    private final DailyMoodLogRepository dailyMoodLogRepository;

    public DailyMoodLogService(DailyMoodLogRepository dailyMoodLogRepository) {
        this.dailyMoodLogRepository = dailyMoodLogRepository;
    }

    public List<DailyMoodLog> getAllDailyMoodLogs() {
        return dailyMoodLogRepository.findAll();
    }

    public DailyMoodLog getDailyMoodLogById(Long moodId, Long auditId) {
        return dailyMoodLogRepository.findById(moodId, auditId);
    }

    public void createDailyMoodLog(DailyMoodLog dailyMoodLog) {
        dailyMoodLogRepository.save(dailyMoodLog);
    }

    public void updateDailyMoodLog(DailyMoodLog dailyMoodLog) {
        dailyMoodLogRepository.update(dailyMoodLog);
    }

    public void deleteDailyMoodLog(Long moodId, Long auditId) {
        dailyMoodLogRepository.delete(moodId, auditId);
    }
}
