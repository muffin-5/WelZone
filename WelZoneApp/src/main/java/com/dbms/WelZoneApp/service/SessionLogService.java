package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.SessionLog;
import com.dbms.WelZoneApp.repository.SessionLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionLogService {

    private final SessionLogRepository sessionLogRepository;

    public SessionLogService(SessionLogRepository sessionLogRepository) {
        this.sessionLogRepository = sessionLogRepository;
    }

    public List<SessionLog> getAllSessionLogs() {
        return sessionLogRepository.findAll();
    }

    public SessionLog getSessionLogById(Long logId) {
        return sessionLogRepository.findById(logId);
    }

    public void createSessionLog(SessionLog sessionLog) {
        sessionLogRepository.save(sessionLog);
    }

    public void updateSessionLog(SessionLog sessionLog) {
        sessionLogRepository.update(sessionLog);
    }

    public void deleteSessionLog(Long logId) {
        sessionLogRepository.delete(logId);
    }
}
