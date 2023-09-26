package com.example.mysocialbook.interfaces;

public interface InterfaceJWTConfig {
    String generateToken(String userId);
    boolean isValidToken(String token, String userId);
    String getLoggedUserId();
}
