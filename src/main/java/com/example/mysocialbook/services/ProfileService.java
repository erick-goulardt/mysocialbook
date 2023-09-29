package com.example.mysocialbook.services;

import com.example.mysocialbook.dtos.*;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.entities.Role;
import com.example.mysocialbook.entities.UserDetailsImpl;
import com.example.mysocialbook.interfaces.ConstantRole;
import com.example.mysocialbook.repositories.ProfileRepository;
import com.example.mysocialbook.repositories.RoleRepository;
import com.example.mysocialbook.security.JwtUtils;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    @Autowired
    AuthenticationConfiguration authConfiguration;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Optional<Profile> getUserById(String userId){
        return profileRepository.findById(userId);
    }

    public MessageResponseDTO createUser(RegisterRequestDTO request){
        if (profileRepository.existsByUsername(request.getUsername())) {
            return new MessageResponseDTO("Error: Username is already taken!");
        }

        if (profileRepository.existsByEmail(request.getEmail())) {
            return new MessageResponseDTO("Error: Email is already in use!");
        }

        Profile profile = new Profile(request.getUsername(),
                request.getEmail(),
                encoder.encode(request.getPassword()), request.getDescription(), request.getAvatarUrl());


        Set<String> strRoles = request.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            Role userRole = roleRepository.findByRole(ConstantRole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Default Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                Role existingRole = roleRepository.findByRole(role.toUpperCase())
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(existingRole);
            });
        }

        profile.setRoles(roles);
        profileRepository.save(profile);

        return new MessageResponseDTO("User registered successfully!");
    }

    public JwtResponse login(LoginRequestDTO request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);
    }

    public Profile editUser(String id, EditUserRequestDTO request) {
        Optional<Profile> optionalUser = profileRepository.findById(id);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(5);
        if(optionalUser.isPresent()) {
            Profile profile = optionalUser.get();if(request.getUsername() != null && !request.getUsername().isEmpty()) profile.setUsername(request.getUsername());
            if(request.getEmail() != null && !request.getEmail().isEmpty()) profile.setEmail(request.getEmail());
            if(request.getDescription() != null && !request.getDescription().isEmpty()) profile.setDescription(request.getDescription());
            if(request.getPassword() != null && !request.getPassword().isEmpty()) profile.setPassword(encoder.encode(request.getPassword()));
            if(request.getAvatarUrl() != null && !request.getAvatarUrl().isEmpty()) profile.setUrlAvatar(request.getAvatarUrl());
            profileRepository.save(profile);
            return profile;

        } else {
            throw new NullPointerException();
        }
    }

    public void addFriend(String currentUserId, String friendId) {
        Optional<Profile> user = profileRepository.findById(currentUserId);
        Optional<Profile> friend = profileRepository.findById(friendId);

        if (user.get().getFriends().contains(friendId)) {
            removeFriend(currentUserId, friendId);
            return;
        }

        if (currentUserId.equals(friendId)) {
            throw new IllegalArgumentException("You cannot follow yourself.");
        }

        user.get().getFriends().add(friendId);
        friend.get().getFriends().add(currentUserId);

        profileRepository.save(user);
        profileRepository.save(friend);
    }

    public void removeFriend(String currentUserId, String friendId) {
        Optional<Profile> user = profileRepository.findById(currentUserId);
        Optional<Profile> friend = profileRepository.findById(friendId);

        user.get().getFriends().remove(friendId);
        friend.get().getFriends().remove(currentUserId);

        profileRepository.save(user);
        profileRepository.save(friend);
    }

    public boolean areFriends(String currentUserId, String friendId) {
        Optional<Profile> user = profileRepository.findById(currentUserId);
        return user.get().getFriends().contains(friendId);
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }


    public void deleteProfile(String id) {
        if (!profileRepository.existsById(id)) {
            throw new NullPointerException("Profile not found");
        }
        profileRepository.deleteById(id);
    }


}

