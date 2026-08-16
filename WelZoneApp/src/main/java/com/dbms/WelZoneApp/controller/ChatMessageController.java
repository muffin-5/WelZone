package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.ChatMessage;
import com.dbms.WelZoneApp.service.ChatMessageService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatMessageController(ChatMessageService chatMessageService,
                                 SimpMessagingTemplate messagingTemplate) {
        this.chatMessageService = chatMessageService;
        this.messagingTemplate = messagingTemplate;
    }

    // Send a new chat message
    @PostMapping("/send")
    public void sendMessage(@RequestBody ChatMessage chatMessage) {
        // Set the timestamp automatically
        chatMessage.setTimestamp(LocalDateTime.now());
        ChatMessage saved = chatMessageService.saveChatMessage(chatMessage);
        // Push the persisted message to all subscribers of this session in real time
        messagingTemplate.convertAndSend(
                "/topic/messages/" + saved.getSessionId(), saved);
    }

    // Get chat messages by session (slot)
    @GetMapping("/messages/{sessionId}")
    public List<ChatMessage> getMessagesBySession(@PathVariable Long sessionId) {
        return chatMessageService.getMessagesBySessionId(sessionId);
    }
}
