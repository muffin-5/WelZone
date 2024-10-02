package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Slot;
import com.dbms.WelZoneApp.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/slots")
public class SlotController {

    @Autowired
    private SlotService slotService;

    // Create a new slot (for counselors/admins)
    @PostMapping("/create")
    public ResponseEntity<String> createSlot(@RequestBody Slot slot) {
        slotService.createSlot(slot);
        return ResponseEntity.ok("Slot created successfully.");
    }

    // Get available slots for a counselor
    @GetMapping("/available/{counselorId}")
    public List<Slot> getAvailableSlots(@PathVariable Long counselorId) {
        return slotService.findAvailableSlots(counselorId);
    }

    // Book a slot
    @PostMapping("/book/{slotId}/user/{userId}")
    public ResponseEntity<String> bookSlot(@PathVariable Long slotId, @PathVariable Long userId) {
        boolean success = slotService.bookSlot(slotId, userId);
        if (success) {
            return ResponseEntity.ok("Slot booked successfully.");
        } else {
            return ResponseEntity.badRequest().body("Slot booking failed.");
        }
    }

    // Cancel a slot booking
    @PostMapping("/cancel/{slotId}")
    public ResponseEntity<String> cancelSlot(@PathVariable Long slotId) {
        boolean success = slotService.cancelSlot(slotId);
        if (success) {
            return ResponseEntity.ok("Slot canceled successfully.");
        } else {
            return ResponseEntity.badRequest().body("Slot cancellation failed.");
        }
    }
}

