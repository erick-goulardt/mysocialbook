package com.example.mysocialbook.controller;

import com.example.mysocialbook.dtos.LoginRequestDTO;
import com.example.mysocialbook.dtos.RegisterRequestDTO;
import com.example.mysocialbook.repositories.ProfileRepository;
import com.example.mysocialbook.repositories.RoleRepository;
import com.example.mysocialbook.security.JwtUtils;
import com.example.mysocialbook.services.ProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    ProfileService profileService;

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
        System.out.println(profileRepository.findByUsername("gougou").get().getFriends().toString());
        var response = profileService.login(loginRequest);
        return ResponseEntity.status(200).body(response);
    }

        @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDTO signUpRequest) {
            var response = profileService.createUser(signUpRequest);
            return ResponseEntity.status(200).body(response);
        }
    }