package com.example.mysocialbook.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "profiles")
@Getter
@Setter
@AllArgsConstructor
public class Profile {
    @Id
    private String id;
    private String name;
    @NotNull
    private String username;
    @NotNull @Email
    private String email;
    @JsonIgnore @Size(min = 10) @NotNull
    private String password;
    private String urlAvatar;
    private Set<String> friends = new HashSet<>();
    @DBRef @JsonManagedReference
    private Set<Post> posts = new HashSet<>();
    @NotBlank
    private String description;
    private Set<Role> roles = new HashSet<>();
    @Min(9) @Max(13)
    private Long number;
    public Profile() {

    }
    public Profile(String username, String email, String password, String description, String urlAvatar, String name, Long number) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.description = description;
        this.urlAvatar = urlAvatar;
        this.name = name;
        this.number = number;
    }

}
