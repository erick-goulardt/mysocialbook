package com.example.mysocialbook.services;

import com.example.mysocialbook.dtos.RegisterDTO;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.repositories.ProfileRepository;
import com.example.mysocialbook.security.InterfaceJWTConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private final ProfileRepository profileRepository;
    @Autowired
    private InterfaceJWTConfig jwtConfig;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public List<Profile> getAllProfiles(){
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileByUsername(String username){
        return profileRepository.findByUsername(username);
    }
    public Optional<Profile> getUserById(String profileId){
        return profileRepository.findById(profileId);
    }

    public String createUser(RegisterDTO registerDTO){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(5);
        var profile = new Profile(registerDTO.username(), registerDTO.email(), encoder.encode(registerDTO.password()));
        profile.setFriends(new HashSet<String>());
        profile.setDescription("");
        profile.setUrlAvatar("");

        if(registerDTO.username().isBlank() || registerDTO.email().isBlank() || registerDTO.password().isBlank()){
            return "Insira seus dados!";
        } else if (profileRepository.findByUsername(registerDTO.username()).isPresent()) {
            throw new IllegalArgumentException("Um usuário com esse username já existe");
        }   else if (profileRepository.findByEmail(registerDTO.email()).isPresent()) {
            throw new IllegalArgumentException("Um usuário com esse email já existe");
        } else {
            profileRepository.save(profile);
            return "Usuário criado com sucesso!";
        }
    }
}

