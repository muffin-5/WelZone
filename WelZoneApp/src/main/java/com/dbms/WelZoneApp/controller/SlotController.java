package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.AuditLogs;
import com.dbms.WelZoneApp.model.SessionLog;
import com.dbms.WelZoneApp.model.Slot;
import com.dbms.WelZoneApp.model.SlotWithCounselorDetails;
import com.dbms.WelZoneApp.model.SlotWithUserDetails;
import com.dbms.WelZoneApp.service.AuditLogsService;
import com.dbms.WelZoneApp.service.SessionLogService;
import com.dbms.WelZoneApp.service.SlotService;
import com.dbms.WelZoneApp.service.UserService;
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
    private final AuditLogsService auditLogsService;
    private final SessionLogService sessionLogService;

    public SlotController(AuditLogsService auditLogsService,SessionLogService sessionLogService) {
        this.auditLogsService=auditLogsService;
        this.sessionLogService=sessionLogService;
    }

    @GetMapping("/{sessionId}")
    public SlotWithCounselorDetails getSlot(@PathVariable Long sessionId) {
        return slotService.findSlotsWithCounselorDetails(sessionId);
    }

    // Create a new slot (for counselors/admins)
    @PostMapping("/create")
    public ResponseEntity<String> createSlot(@RequestBody Slot slot) {
        slotService.createSlot(slot);
        AuditLogs auditLogs= auditLogsService.saveAuditLog(null,slot.getCounselorId(),"Create","Counselor created a slot");
        sessionLogService.createSessionLog(slot.getId(),"Counselor created a slot");
        return ResponseEntity.ok("Slot created successfully.");
    }

//    @GetMapping("/{sessionId}")
//    public Slot getSlot(@PathVariable Long sessionId) {
//        return slotService.findSlotById(sessionId);
//    }

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
            AuditLogs auditLogs= auditLogsService.saveAuditLog(userId,null,"Book","User Booked a session");
            sessionLogService.createSessionLog(slotId,"User Booked a slot");
            return ResponseEntity.ok("Slot booked successfully.");
        } else {
            return ResponseEntity.badRequest().body("Slot booking failed.");
        }
    }

    // Get booked slots for a counselor with date >= today
    @GetMapping("/booked/{counselorId}")
    public ResponseEntity<List<SlotWithUserDetails>> getUpcomingBookedSlots(@PathVariable Long counselorId) {
        LocalDateTime currentTime = LocalDateTime.now();
        List<SlotWithUserDetails> upcomingSlots = slotService.getBookedSlotsByCounselorWithUserDetails(counselorId, currentTime);

        if (upcomingSlots.isEmpty()) {
            return ResponseEntity.noContent().build(); // No slots found
        } else {
            return ResponseEntity.ok(upcomingSlots);
        }
    }

    // Get booked slots for a user with date >= today
    @GetMapping("/bookedbyme/{userId}")
    public ResponseEntity<List<SlotWithCounselorDetails>> getUpcomingBookedSlotsByUser(@PathVariable Long userId) {
        LocalDateTime currentTime = LocalDateTime.now();
        List<SlotWithCounselorDetails> upcomingSlots = slotService.getBookedSlotsByUserWithCounselorDetails(userId, currentTime);

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
            AuditLogs auditLogs= auditLogsService.saveAuditLog(null,null,"Cancel","Session Canceled");
            return ResponseEntity.ok("Slot canceled successfully.");
        } else {
            return ResponseEntity.badRequest().body("Slot cancellation failed.");
        }
    }

    // Get all slots (booked + open) for a counselor with member details
    @GetMapping("/all/{counselorId}")
    public ResponseEntity<List<SlotWithUserDetails>> getAllSlots(@PathVariable Long counselorId) {
        List<SlotWithUserDetails> allSlots = slotService.getAllSlotsByCounselorWithUserDetails(counselorId);
        if (allSlots.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(allSlots);
    }

    // Delete a slot
    @DeleteMapping("/{slotId}")
    public ResponseEntity<String> deleteSlot(@PathVariable Long slotId) {
        boolean success = slotService.deleteSlot(slotId);
        if (success) {
            AuditLogs auditLogs = auditLogsService.saveAuditLog(null, null, "Delete", "Slot deleted");
            return ResponseEntity.ok("Slot deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Slot deletion failed.");
        }
    }
}
