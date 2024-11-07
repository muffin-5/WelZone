package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Slot;
import com.dbms.WelZoneApp.model.SlotWithCounselorDetails;
import com.dbms.WelZoneApp.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    // Create a new slot
    public void createSlot(Slot slot) {
        slotRepository.createSlot(slot);
    }


    // Find a slot by ID
    public Slot findSlotById(Long id) {
        return slotRepository.findSlotById(id);
    }

    public SlotWithCounselorDetails findSlotsWithCounselorDetails(Long id) {
        return slotRepository.findSlotsWithCounselorDetails(id);
    }

    // Find available slots for a specific counselor
    public List<Slot> findAvailableSlots(Long counselorId) {
        LocalDateTime currentTime = LocalDateTime.now();
        return slotRepository.findAvailableSlots(counselorId, currentTime);
    }

    // Find all available slots with counselor details
    public List<SlotWithCounselorDetails> findAvailableSlotsWithCounselorDetails() {
        LocalDateTime currentTime = LocalDateTime.now();
        return slotRepository.findAvailableSlotsWithCounselorDetails(currentTime);
    }

    // Find booked slots with end time greater than the current time
    public List<Slot> getBookedSlotsWithEndTime(Long counselorId, LocalDateTime currentTime) {
        return slotRepository.findBookedSlotsWithEndTime(counselorId, currentTime);
    }

    // Find booked slots by user with end time greater than the current time
    public List<Slot> getBookedSlotsWithEndTimeByUser(Long userId, LocalDateTime currentTime) {
        return slotRepository.findBookedSlotsWithEndTimebyUser(userId, currentTime);
    }

    // Book a slot
    public boolean bookSlot(Long slotId, Long userId) {
        int rowsAffected = slotRepository.bookSlot(slotId, userId);
        return rowsAffected > 0;  // Return true if the booking was successful
    }

    // Cancel a slot booking
    public boolean cancelSlot(Long slotId) {
        int rowsAffected = slotRepository.cancelSlot(slotId);
        return rowsAffected > 0;  // Return true if the cancellation was successful
    }
}
