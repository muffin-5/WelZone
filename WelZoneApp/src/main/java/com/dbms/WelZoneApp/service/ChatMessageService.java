package com.dbms.WelZoneApp.service;

import com.dbms.WelZoneApp.model.ChatMessage;
import com.dbms.WelZoneApp.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    // Save chat message and return the persisted entity (with generated id + timestamp)
    public ChatMessage saveChatMessage(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }

    // Retrieve messages by session (slot)
    public List<ChatMessage> getMessagesBySessionId(Long sessionId) {
        return chatMessageRepository.getBySessionId(sessionId);
    }
}
