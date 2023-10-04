package com.example.mysocialbook.dtos;

import lombok.Data;

@Data
public class AuthenticateResponseDTO {
    private String token;
    private String profileId;
}
