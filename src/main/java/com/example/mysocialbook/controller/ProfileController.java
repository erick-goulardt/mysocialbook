package com.example.mysocialbook.controller;

import com.example.mysocialbook.dtos.EditUserRequestDTO;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.security.JwtUtils;
import com.example.mysocialbook.services.ProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
        System.out.println(profileService.getAllProfiles());
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

    @PostMapping("/addFriend")
    public ResponseEntity<String> addFriend(@RequestParam String friendId, Authentication authentication) {
        String token = jwtUtils.generateJwtToken(authentication);
        String currentUserId = profileService.getUserById(jwtUtils.getUserNameFromJwtToken(token)).get().getId();

        try {
            profileService.addFriend(currentUserId, friendId);
            return ResponseEntity.ok("Friend added successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/removeFriend")
    public ResponseEntity<String> removeFriend(@RequestParam String friendId, Authentication authentication) {
        String token = jwtUtils.generateJwtToken(authentication);
        String currentUserId = profileService.getUserById(jwtUtils.getUserNameFromJwtToken(token)).get().getId();

        profileService.removeFriend(currentUserId, friendId);
        return ResponseEntity.ok("Friend removed successfully.");
    }

    @GetMapping("/areFriends")
    public ResponseEntity<Boolean> areFriends(@RequestParam String friendId, Authentication authentication) {
        String token = jwtUtils.generateJwtToken(authentication);
        String currentUserId = profileService.getUserById(jwtUtils.getUserNameFromJwtToken(token)).get().getId();

        boolean areFriends = profileService.areFriends(currentUserId, friendId);
        return ResponseEntity.ok(areFriends);
    }

}
