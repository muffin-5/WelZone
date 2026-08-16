package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Counselor;
import com.dbms.WelZoneApp.model.LoginRequest;
import com.dbms.WelZoneApp.service.AuditLogsService;
import com.dbms.WelZoneApp.service.CounselorService;
import com.dbms.WelZoneApp.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/counselors")
public class CounselorController {
    private final CounselorService counselorService;
    private final AuditLogsService auditLogsService;
    private final JwtUtil jwtUtil;

    public CounselorController(CounselorService counselorService, AuditLogsService auditLogsService, JwtUtil jwtUtil) {
        this.counselorService = counselorService;
        this.auditLogsService=auditLogsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<Void> createCounselor(@RequestBody Counselor counselor) {
        counselorService.addCounselor(counselor);
        auditLogsService.saveAuditLog(null,counselor.getCounselorId(),"Registered","Counselor registered successfully");
        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity<List<Counselor>> getAllCounselors() {
        return ResponseEntity.ok(counselorService.getAllCounselors());
    }

    @GetMapping("/id/{counselorId}")
    public ResponseEntity<Counselor> getCounselor(@PathVariable Long counselorId) {
        Counselor counselor = counselorService.getCounselorById(counselorId);
        return ResponseEntity.ok(counselor);
    }

    @PutMapping("/{counselorId}")
    public ResponseEntity<Void> updateCounselor(@PathVariable Long counselorId, @RequestBody Counselor counselor) {
        counselor.setCounselorId(counselorId);
        counselorService.updateCounselor(counselor);
        auditLogsService.saveAuditLog(null,counselor.getCounselorId(),"Update","Counselor updated successfully");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{counselorId}")
    public ResponseEntity<Void> deleteCounselor(@PathVariable Long counselorId) {
        counselorService.deleteCounselor(counselorId);
        auditLogsService.saveAuditLog(null,counselorId,"Delete","Counselor deleted successfully");
        return ResponseEntity.noContent().build();
    }

    // Login counselor
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginCounselor(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = counselorService.authenticateCounselor(loginRequest.getUsername(), loginRequest.getPassword());

        if (isAuthenticated) {
            Counselor counselor = counselorService.getCounselorByUsername(loginRequest.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Counselor logged in successfully!");
            response.put("counselorId", counselor.getCounselorId()); // Assuming you have a getCounselorId method
            response.put("whoLogged", "counselor");
            response.put("token", jwtUtil.generateToken(counselor.getCounselorId(), "COUNSELOR"));

            auditLogsService.saveAuditLog(null,counselor.getCounselorId(),"Login","Counselor logged in successfully");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password!"));
        }
    }



}
