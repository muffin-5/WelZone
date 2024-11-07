package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Qualification;
import com.dbms.WelZoneApp.service.QualificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/qualifications")
public class QualificationController {
    private final QualificationService qualificationService;

    public QualificationController(QualificationService qualificationService) {
        this.qualificationService = qualificationService;
    }

    @GetMapping
    public List<Qualification> getAllQualifications() {
        return qualificationService.getAllQualifications();
    }

    @GetMapping("/{id}")
    public Qualification getQualificationById(@PathVariable("id") Long qualificationId) {
        return qualificationService.getQualificationById(qualificationId);
    }

    @PostMapping
    public void addQualification(@RequestBody Qualification qualification) {
        qualificationService.addQualification(qualification);
    }

    @PutMapping("/{id}")
    public void updateQualification(@PathVariable("id") Long qualificationId, @RequestBody Qualification qualification) {
        qualification.setQualificationId(qualificationId);
        qualificationService.updateQualification(qualification);
    }

    @DeleteMapping("/{id}")
    public void deleteQualification(@PathVariable("id") Long qualificationId) {
        qualificationService.deleteQualification(qualificationId);
    }
}
