package com.example.mysocialbook.dtos;

import com.example.mysocialbook.entities.Post;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PostResponseDTO {
    private String id;
    private String subject;
    private String title;
    private String urlImage;
    private LocalDate created;

    public static PostResponseDTO mapToResponse(Post post) {
        PostResponseDTO response = new PostResponseDTO();
        response.setId(post.getId());
        response.setSubject(post.getSubject());
        response.setTitle(post.getTitle());
        response.setUrlImage(post.getUrlImage());
        response.setCreated(post.getCreated());
        return response;
    }
}
