package com.example.mysocialbook.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document
@Data @AllArgsConstructor
public class Profile {
    @Id
    private String id;
    @NotNull
    private String username;
    @NotNull
    private String email;
    @JsonIgnore @Size(min = 10) @NotNull
    private String password;
    private String urlAvatar;
    private Set<String> friends = new HashSet<>();
    @NotBlank
    private String description;

    public Profile() {

    }
    public Profile(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}