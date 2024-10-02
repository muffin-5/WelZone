package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.ChatMessage;
import com.dbms.WelZoneApp.service.ChatMessageService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    // Send a new chat message
    @PostMapping("/send")
    public void sendMessage(@RequestBody ChatMessage chatMessage) {
        // Set the timestamp automatically
        chatMessage.setTimestamp(LocalDateTime.now());
        chatMessageService.saveChatMessage(chatMessage);
    }

    // Get chat messages by session (slot)
    @GetMapping("/messages/{sessionId}")
    public List<ChatMessage> getMessagesBySession(@PathVariable Long sessionId) {
        return chatMessageService.getMessagesBySessionId(sessionId);
    }
}
