//package com.dbms.WelZoneApp.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//
//    @Override
//    public void configureMessageBroker(org.springframework.messaging.simp.config.MessageBrokerRegistry config) {
//        config.enableSimpleBroker("/topic"); // Enables a simple in-memory broker
//        config.setApplicationDestinationPrefixes("/app"); // Prefix for messages bound for methods annotated with @MessageMapping
//    }
//
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        // Allow CORS for your frontend origin
//        registry.addEndpoint("/chat-websocket")
//                .setAllowedOrigins("http://127.0.0.1:5500", "http://localhost:5500") // Add all necessary origins
//                .withSockJS();
//    }
//}
