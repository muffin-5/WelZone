package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.AuditLogs;
import com.dbms.WelZoneApp.service.AuditLogsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/audit-logs")
public class AuditLogsController {
    @Autowired
    private AuditLogsService auditLogsService;

    // Endpoint to create a new audit log entry (Create)
    @PostMapping
    public ResponseEntity<AuditLogs> createAuditLog(@RequestBody AuditLogs auditLog) {
        AuditLogs createdLog = auditLogsService.saveAuditLog(auditLog);
        return ResponseEntity.ok(createdLog);
    }

    // Endpoint to get all audit logs (Read)
    @GetMapping
    public ResponseEntity<List<AuditLogs>> getAllAuditLogs() {
        List<AuditLogs> logs = auditLogsService.getAllAuditLogs();
        return ResponseEntity.ok(logs);
    }

    // Endpoint to get an audit log by its ID (Read)
    @GetMapping("/{auditId}")
    public ResponseEntity<AuditLogs> getAuditLogById(@PathVariable Long auditId) {
        return auditLogsService.getAuditLogById(auditId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint to update an audit log entry (Update)
    @PutMapping("/{auditId}")
    public ResponseEntity<Void> updateAuditLog(@PathVariable Long auditId, @RequestBody AuditLogs auditLog) {
        auditLog.setAuditId(auditId);
        auditLogsService.updateAuditLog(auditLog);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to delete an audit log entry (Delete)
    @DeleteMapping("/{auditId}")
    public ResponseEntity<Void> deleteAuditLog(@PathVariable Long auditId) {
        auditLogsService.deleteAuditLog(auditId);
        return ResponseEntity.noContent().build();
    }
}
