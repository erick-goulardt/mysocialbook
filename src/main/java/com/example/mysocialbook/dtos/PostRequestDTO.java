package com.example.mysocialbook.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class PostRequestDTO {
    private String title;
    private String description;
    private String photoUrl;

    public PostRequestDTO(String title, String description) {
        this.title = title;
        this.description = description;
    }
}


