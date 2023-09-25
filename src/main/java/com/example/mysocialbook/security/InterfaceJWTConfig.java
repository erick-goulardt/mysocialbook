package com.example.mysocialbook.security;

public interface InterfaceJWTConfig {
    String generateToken(String userId);
    boolean isValidToken(String token, String userId);
    String getLoggedUserId();
}
