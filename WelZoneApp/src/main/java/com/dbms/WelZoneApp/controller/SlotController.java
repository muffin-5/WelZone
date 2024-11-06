package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.Slot;
import com.dbms.WelZoneApp.model.SlotWithCounselorDetails;
import com.dbms.WelZoneApp.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/slots")
public class SlotController {

    @Autowired
    private SlotService slotService;


    @GetMapping("/{sessionId}")
    public SlotWithCounselorDetails getSlot(@PathVariable Long sessionId) {
        return slotService.findSlotsWithCounselorDetails(sessionId);
    }

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

    // Get all available slots with counselor details
    @GetMapping("/available")
    public ResponseEntity<List<SlotWithCounselorDetails>> getAvailableSlotsWithCounselorDetails() {
        List<SlotWithCounselorDetails> availableSlots = slotService.findAvailableSlotsWithCounselorDetails();

        if (availableSlots.isEmpty()) {
            return ResponseEntity.noContent().build(); // No slots found
        } else {
            return ResponseEntity.ok(availableSlots);
        }
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

    // Get booked slots for a counselor with date >= today
    @GetMapping("/booked/{counselorId}")
    public ResponseEntity<List<Slot>> getUpcomingBookedSlots(@PathVariable Long counselorId) {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Slot> upcomingSlots = slotService.getBookedSlotsWithEndTime(counselorId, currentTime);

        if (upcomingSlots.isEmpty()) {
            return ResponseEntity.noContent().build(); // No slots found
        } else {
            return ResponseEntity.ok(upcomingSlots);
        }
    }

    // Get booked slots for a user with date >= today
    @GetMapping("/bookedbyme/{userId}")
    public ResponseEntity<List<Slot>> getUpcomingBookedSlotsByUser(@PathVariable Long userId) {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Slot> upcomingSlots = slotService.getBookedSlotsWithEndTimeByUser(userId, currentTime);

        if (upcomingSlots.isEmpty()) {
            return ResponseEntity.noContent().build(); // No slots found
        } else {
            return ResponseEntity.ok(upcomingSlots);
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
