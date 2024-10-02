package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Qualification;
import com.dbms.WelZoneApp.repository.QualificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QualificationService {
    private final QualificationRepository qualificationRepository;

    public QualificationService(QualificationRepository qualificationRepository) {
        this.qualificationRepository = qualificationRepository;
    }

    public List<Qualification> getAllQualifications() {
        return qualificationRepository.findAll();
    }

    public Qualification getQualificationById(Long qualificationId) {
        return qualificationRepository.findById(qualificationId);
    }

    public void addQualification(Qualification qualification) {
        qualificationRepository.save(qualification);
    }

    public void updateQualification(Qualification qualification) {
        qualificationRepository.update(qualification);
    }

    public void deleteQualification(Long qualificationId) {
        qualificationRepository.delete(qualificationId);
    }
}
