package com.example.mysocialbook.dtos;

import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequestDTO {
    private String email;
    private String username;
    private String password;
    private String description;
    private String avatarUrl;
    private Set<String> roles;

}
