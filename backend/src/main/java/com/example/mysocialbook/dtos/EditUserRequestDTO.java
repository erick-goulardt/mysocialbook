package com.example.mysocialbook.dtos;

import lombok.Data;

@Data
public class EditUserRequestDTO {
    private String username;
    private String email;
    private String password;
    private String avatarUrl;
    private String description;
    private Long number;
    private String name;
}
