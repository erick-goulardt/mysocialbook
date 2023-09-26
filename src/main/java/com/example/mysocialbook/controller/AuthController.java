package com.example.mysocialbook.controller;


import com.example.mysocialbook.dtos.AuthenticateResponseDTO;
import com.example.mysocialbook.dtos.LoginRequestDTO;
import com.example.mysocialbook.dtos.RegisterRequestDTO;
import com.example.mysocialbook.services.ProfileService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("mysocialbook")
public class AuthController {
    private final ProfileService profileService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticateResponseDTO> loginUser(@Valid @RequestBody LoginRequestDTO request){
        var response = profileService.login(request);
        return ResponseEntity.status(200).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@Valid @RequestBody RegisterRequestDTO request){
        var response = profileService.createUser(request);
        return ResponseEntity.status(200).body(response);
    }
}
