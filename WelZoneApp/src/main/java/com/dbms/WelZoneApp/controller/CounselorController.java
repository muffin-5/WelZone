package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Counselor;
import com.dbms.WelZoneApp.service.CounselorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/counselors")
public class CounselorController {
    private final CounselorService counselorService;

    public CounselorController(CounselorService counselorService) {
        this.counselorService = counselorService;
    }

    @PostMapping
    public ResponseEntity<Void> createCounselor(@RequestBody Counselor counselor) {
        counselorService.addCounselor(counselor);
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
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{counselorId}")
    public ResponseEntity<Void> deleteCounselor(@PathVariable Long counselorId) {
        counselorService.deleteCounselor(counselorId);
        return ResponseEntity.noContent().build();
    }

    // Login counselor
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginCounselor(@RequestBody Counselor loginCounselor) {
        boolean isAuthenticated = counselorService.authenticateCounselor(loginCounselor.getUsername(), loginCounselor.getPassword());

        if (isAuthenticated) {
            Counselor counselor = counselorService.getCounselorByUsername(loginCounselor.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Counselor logged in successfully!");
            response.put("counselorId", counselor.getCounselorId()); // Assuming you have a getCounselorId method
            response.put("whoLogged", "counselor");

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password!"));
        }
    }

}
