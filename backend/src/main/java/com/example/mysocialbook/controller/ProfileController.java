package com.example.mysocialbook.controller;

import com.example.mysocialbook.dtos.EditUserRequestDTO;
import com.example.mysocialbook.entities.Post;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.security.JwtUtils;
import com.example.mysocialbook.services.ProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable String id) {
        Optional<Profile> profile = profileService.getUserById(id);
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileService.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable String id, @Valid @RequestBody EditUserRequestDTO requestDTO) {
        Profile updated = profileService.editUser(id, requestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable String id) {
        profileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/followFriend/{profileId}/{friendId}")
    public ResponseEntity<String> followFriend(@PathVariable String profileId, @PathVariable String friendId) {
        profileService.followFriend(profileId, friendId);
        return new ResponseEntity<>("Amigo seguido com sucesso", HttpStatus.OK);
    }

    @PostMapping("/removeFriend/{profileId}/{friendId}")
    public ResponseEntity<String> removeFriend(@PathVariable String friendId, @PathVariable String profileId) {
        boolean success = profileService.unfollowFriend(profileId, friendId);

        if (success) {
            return new ResponseEntity<>("Amigo desseguido com sucesso", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Não foi possível desseguir o amigo", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/find/user/{username}")
    public ResponseEntity<Profile> findUser(@PathVariable String username) {
        Optional<Profile> profile = profileService.searchByUsername(username);
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{profileId}/posts")
    public ResponseEntity<?> getFriendPosts(@PathVariable String profileId) {
        try {
            List<Post> friendPosts = profileService.getFriendPosts(profileId);
            return ResponseEntity.ok(friendPosts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao obter os posts dos amigos: " + e.getMessage());
        }
    }

    @GetMapping("/{profileId}/friends")
    public ResponseEntity<?> getFriendsList(@PathVariable String profileId) {
        try {
            List<Profile> friendsList = profileService.getFriendsList(profileId);
            return ResponseEntity.ok(friendsList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao obter a lista de amigos: " + e.getMessage());
        }
    }
}
