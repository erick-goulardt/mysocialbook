package com.example.mysocialbook.entities;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "posts")
@AllArgsConstructor
public class Post {
    @Id
    private String id;
    @NotNull
    private String profileId;
    @NotBlank
    private String subject;
    private List<String> likes;
    private String title;
    private String urlImage;
    private LocalDate created;

    public Post() {

    }
    public Post(String profileId, String subject) {
    }
}
