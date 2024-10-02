package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Counselor;
import com.dbms.WelZoneApp.service.CounselorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{counselorId}")
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
}
