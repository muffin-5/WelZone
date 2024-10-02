package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.AuditLogs;
import com.dbms.WelZoneApp.repository.AuditLogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuditLogsService {
    @Autowired
    private AuditLogsRepository auditLogsRepository;

    // Method to save an audit log entry (Create)
    public AuditLogs saveAuditLog(AuditLogs auditLog) {
        auditLogsRepository.save(auditLog);
        return auditLog; // Return the saved audit log
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
