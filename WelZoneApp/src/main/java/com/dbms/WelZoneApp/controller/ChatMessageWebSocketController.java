package com.dbms.WelZoneApp.controller;

import com.dbms.WelZoneApp.model.ChatMessage;
import com.dbms.WelZoneApp.model.TypingEvent;
import com.dbms.WelZoneApp.service.ChatMessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Clock;
import java.time.LocalDateTime;

@Controller
public class ChatMessageWebSocketController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatMessageWebSocketController(ChatMessageService chatMessageService,
                                          SimpMessagingTemplate messagingTemplate) {
        this.chatMessageService = chatMessageService;
        this.messagingTemplate = messagingTemplate;
    }

    // Client sends to /app/sendMessage  ->  saves the message and pushes it to
    // everyone subscribed to /topic/messages/{sessionId}
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // Set the timestamp to UTC so clients can render it in their own zone
        chatMessage.setTimestamp(LocalDateTime.now(Clock.systemUTC()));
        ChatMessage saved = chatMessageService.saveChatMessage(chatMessage);
        messagingTemplate.convertAndSend(
                "/topic/messages/" + saved.getSessionId(), saved);
    }

    // Client sends to /app/typing  ->  broadcasts typing status to
    // /topic/typing/{sessionId} so the other party can show the "typing..." bubble
    @MessageMapping("/typing")
    public void typing(@Payload TypingEvent typingEvent) {
        messagingTemplate.convertAndSend(
                "/topic/typing/" + typingEvent.getSessionId(), typingEvent);
    }
}