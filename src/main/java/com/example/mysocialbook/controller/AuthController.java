package com.example.mysocialbook.controller;


import com.example.mysocialbook.dtos.JwtResponse;
import com.example.mysocialbook.dtos.LoginRequestDTO;
import com.example.mysocialbook.dtos.MessageResponseDTO;
import com.example.mysocialbook.dtos.RegisterRequestDTO;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.entities.Role;
import com.example.mysocialbook.entities.UserDetailsImpl;
import com.example.mysocialbook.interfaces.ConstantRole;
import com.example.mysocialbook.repositories.ProfileRepository;
import com.example.mysocialbook.repositories.RoleRepository;
import com.example.mysocialbook.security.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

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


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

        @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDTO signUpRequest) {
            if (profileRepository.existsByUsername(signUpRequest.getUsername())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponseDTO("Error: Username is already taken!"));
            }

            if (profileRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponseDTO("Error: Email is already in use!"));
            }

            Profile profile = new Profile(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()));

            Set<String> strRoles = signUpRequest.getRoles();
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

            return ResponseEntity.ok(new MessageResponseDTO("User registered successfully!"));
        }
    }