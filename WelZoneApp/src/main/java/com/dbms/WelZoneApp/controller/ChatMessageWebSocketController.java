package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.ChatMessage;
import com.dbms.WelZoneApp.service.ChatMessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatMessageWebSocketController {

    private final ChatMessageService chatMessageService;

    public ChatMessageWebSocketController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/sendMessage")  // Maps to /app/sendMessage
    @SendTo("/topic/messages")       // Broadcasts to /topic/messages
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        // Save the chat message to the database
        chatMessageService.saveChatMessage(chatMessage);
        // Return the message to broadcast it
        return chatMessage;
    }
}
