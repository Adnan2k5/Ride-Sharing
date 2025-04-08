package com.ems.ems_server.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocket implements WebSocketMessageBrokerConfigurer {

    @SuppressWarnings("null")
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Configure broker with topic and queue destinations
        config.enableSimpleBroker("/notif", "/chat");
        config.setApplicationDestinationPrefixes("/captain");
    }

    @SuppressWarnings("null")
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register STOMP endpoint for WebSocket connections
        registry.addEndpoint("/api/rides/book")
                .setAllowedOrigins("*")  // Allow all origins (change for security)
                .withSockJS();  // Use SockJS for fallback options
    }
}
