package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.SessionLog;
import com.dbms.WelZoneApp.service.SessionLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/session-logs")
public class SessionLogController {

    private final SessionLogService sessionLogService;

    public SessionLogController(SessionLogService sessionLogService) {
        this.sessionLogService = sessionLogService;
    }

    @GetMapping
    public List<SessionLog> getAllSessionLogs() {
        return sessionLogService.getAllSessionLogs();
    }

    @GetMapping("/{logId}")
    public SessionLog getSessionLogById(@PathVariable Long logId) {
        return sessionLogService.getSessionLogById(logId);
    }

    @PostMapping
    public void createSessionLog(@RequestBody SessionLog sessionLog) {
        sessionLogService.createSessionLog(sessionLog.getSessionId(),sessionLog.getLogDetails());
    }

    @PutMapping("/{logId}")
    public void updateSessionLog(@PathVariable Long logId, @RequestBody SessionLog sessionLog) {
        sessionLog.setLogId(logId);
        sessionLogService.updateSessionLog(sessionLog);
    }

    @DeleteMapping("/{logId}")
    public void deleteSessionLog(@PathVariable Long logId) {
        sessionLogService.deleteSessionLog(logId);
    }
}
