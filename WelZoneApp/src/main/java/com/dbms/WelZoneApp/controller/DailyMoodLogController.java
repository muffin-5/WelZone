package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.DailyMoodLog;
import com.dbms.WelZoneApp.service.DailyMoodLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/daily-mood-logs")
public class DailyMoodLogController {

    private final DailyMoodLogService dailyMoodLogService;

    public DailyMoodLogController(DailyMoodLogService dailyMoodLogService) {
        this.dailyMoodLogService = dailyMoodLogService;
    }

    @GetMapping
    public List<DailyMoodLog> getAllDailyMoodLogs() {
        return dailyMoodLogService.getAllDailyMoodLogs();
    }

    @GetMapping("/{moodId}/{auditId}")
    public DailyMoodLog getDailyMoodLogById(@PathVariable Long moodId, @PathVariable Long auditId) {
        return dailyMoodLogService.getDailyMoodLogById(moodId, auditId);
    }

    @PostMapping
    public void createDailyMoodLog(@RequestBody DailyMoodLog dailyMoodLog) {
        dailyMoodLogService.createDailyMoodLog(dailyMoodLog);
    }

    @PutMapping("/{moodId}/{auditId}")
    public void updateDailyMoodLog(@PathVariable Long moodId, @PathVariable Long auditId, @RequestBody DailyMoodLog dailyMoodLog) {
        dailyMoodLog.setMoodId(moodId);
        dailyMoodLog.setAuditId(auditId);
        dailyMoodLogService.updateDailyMoodLog(dailyMoodLog);
    }

    @DeleteMapping("/{moodId}/{auditId}")
    public void deleteDailyMoodLog(@PathVariable Long moodId, @PathVariable Long auditId) {
        dailyMoodLogService.deleteDailyMoodLog(moodId, auditId);
    }
}
