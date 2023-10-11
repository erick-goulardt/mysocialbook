package com.example.mysocialbook.services;

import com.example.mysocialbook.dtos.*;
import com.example.mysocialbook.entities.Post;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.entities.Role;
import com.example.mysocialbook.entities.UserDetailsImpl;
import com.example.mysocialbook.interfaces.ConstantRole;
import com.example.mysocialbook.repositories.ProfileRepository;
import com.example.mysocialbook.repositories.RoleRepository;
import com.example.mysocialbook.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
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
                encoder.encode(request.getPassword()), request.getDescription(), request.getAvatarUrl(), request.getName(), request.getNumber());

        Set<Role> roles = new HashSet<>();
        Role role = new Role();
        role.setRole(ConstantRole.USER);
        roles.add(role);

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
            Profile profile = optionalUser.get();
            if(request.getUsername() != null && !request.getUsername().isEmpty()) profile.setUsername(request.getUsername());
            if(request.getEmail() != null && !request.getEmail().isEmpty()) profile.setEmail(request.getEmail());
            if(request.getName() != null && !request.getName().isEmpty()) profile.setName(request.getName());
            if(request.getNumber() != null) profile.setNumber(request.getNumber());
            if(request.getDescription() != null && !request.getDescription().isEmpty()) profile.setDescription(request.getDescription());
            if(request.getPassword() != null && !request.getPassword().isEmpty()) profile.setPassword(encoder.encode(request.getPassword()));
            if(request.getAvatarUrl() != null && !request.getAvatarUrl().isEmpty()) profile.setUrlAvatar(request.getAvatarUrl());
            profileRepository.save(profile);
            return profile;

        } else {
            throw new NullPointerException();
        }
    }

    public void followFriend(String profileId, String friendId) {
        Profile profile = profileRepository.findById(profileId).orElse(null);
        Profile friendProfile = profileRepository.findById(friendId).orElse(null);

        if (profile != null && friendProfile != null) {
            profile.getFriends().add(friendId);
            profileRepository.save(profile);
        } else {
            throw new IllegalArgumentException("Perfil ou amigo não encontrado.");
        }
    }

    public List<Post> getFriendPosts(String profileId) {
        Profile profile = profileRepository.findById(profileId).orElse(null);

        if (profile != null) {

            Set<String> friendIds = profile.getFriends();

            List<Post> friendPosts = new ArrayList<>();
            for (String friendId : friendIds) {
                Profile friendProfile = profileRepository.findById(friendId).orElse(null);
                if (friendProfile != null) {
                    friendPosts.addAll(friendProfile.getPosts());
                }
            }
            return friendPosts;
        } else {
            throw new IllegalArgumentException("Perfil não encontrado.");
        }
    }

    public List<Profile> getFriendsList(String profileId) {
        Profile profile = profileRepository.findById(profileId).orElse(null);

        if (profile != null) {
            Set<String> friendIds = profile.getFriends();

            List<Profile> friendsList = new ArrayList<>();
            for (String friendId : friendIds) {
                Profile friendProfile = profileRepository.findById(friendId).orElse(null);
                if (friendProfile != null) {
                    friendsList.add(friendProfile);
                }
            }
            return friendsList;
        } else {
            throw new IllegalArgumentException("Perfil não encontrado.");
        }
    }


    public boolean unfollowFriend(String profileId, String friendId) {
        Profile profile = profileRepository.findById(profileId).orElse(null);
        Profile friendProfile = profileRepository.findById(friendId).orElse(null);

        if (profile == null || friendProfile == null) {
            return false;
        }
        if (profile.getFriends().contains(friendId)) {
            return false;
        }

        profile.getFriends().remove(friendId);
        profileRepository.save(profile);

        return true;
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

    public Optional<Profile> searchByUsername(String username) {
        return profileRepository.findByUsername(username);
    }

}

