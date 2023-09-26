package com.example.mysocialbook.dtos;

import lombok.Data;

@Data
public class PostRequestDTO {
    private String title;
    private String description;
    private String profileId;
}
