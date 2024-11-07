package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.AuditLogs;
import com.dbms.WelZoneApp.repository.AuditLogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuditLogsService {
    @Autowired
    private AuditLogsRepository auditLogsRepository;

    // Method to save an audit log entry (Create)
    public AuditLogs saveAuditLog(Long userId,Long counselorId, String action, String details) {
        AuditLogs auditLog=new AuditLogs();
        auditLog.setUserId(userId);
        auditLog.setCouselorId(counselorId);
        auditLog.setAction(action);
        auditLog.setDetails(details);
        auditLog.setTimestamp(LocalDateTime.now());
        return auditLogsRepository.save(auditLog);
    }

    // Method to get all audit logs (Read)
    public List<AuditLogs> getAllAuditLogs() {
        return auditLogsRepository.findAll();
    }

    // Method to get a log by its auditId (Read)
    public Optional<AuditLogs> getAuditLogById(Long auditId) {
        return Optional.ofNullable(auditLogsRepository.findById(auditId));
    }

    // Method to update an audit log entry (Update)
    public void updateAuditLog(AuditLogs auditLog) {
        auditLogsRepository.update(auditLog);
    }

    // Method to delete an audit log entry (Delete)
    public void deleteAuditLog(Long auditId) {
        auditLogsRepository.delete(auditId);
    }
}
