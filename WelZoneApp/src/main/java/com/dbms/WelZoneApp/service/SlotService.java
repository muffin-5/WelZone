package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.Slot;
import com.dbms.WelZoneApp.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // Find available slots for a counselor
    public List<Slot> findAvailableSlots(Long counselorId) {
        return slotRepository.findAvailableSlots(counselorId);
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
