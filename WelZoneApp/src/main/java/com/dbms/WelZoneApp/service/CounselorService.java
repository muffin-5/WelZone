package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Counselor;
import com.dbms.WelZoneApp.repository.CounselorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CounselorService {
    private final CounselorRepository counselorRepository;

    public CounselorService(CounselorRepository counselorRepository) {
        this.counselorRepository = counselorRepository;
    }

    public void addCounselor(Counselor counselor) {
        counselorRepository.save(counselor);
    }

    public List<Counselor> getAllCounselors() {
        return counselorRepository.findAll();
    }

    public Counselor getCounselorById(Long counselorId) {
        return counselorRepository.findById(counselorId);
    }

    public void updateCounselor(Counselor counselor) {
        counselorRepository.update(counselor);
    }

    public void deleteCounselor(Long counselorId) {
        counselorRepository.delete(counselorId);
    }

    public Counselor getCounselorByUsername(String username) {
        return counselorRepository.findByUsername(username);
    }

    // Method to authenticate counselor
    public boolean authenticateCounselor(String username, String password) {
         return counselorRepository.verifyCounselorCredentials(username,password);
    }
}
