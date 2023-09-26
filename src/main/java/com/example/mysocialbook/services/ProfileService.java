package com.example.mysocialbook.services;

import com.example.mysocialbook.dtos.AuthenticateResponseDTO;
import com.example.mysocialbook.dtos.EditUserRequestDTO;
import com.example.mysocialbook.dtos.LoginRequestDTO;
import com.example.mysocialbook.dtos.RegisterRequestDTO;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.interfaces.InterfaceProfile;
import com.example.mysocialbook.repositories.ProfileRepository;
import com.example.mysocialbook.interfaces.InterfaceJWTConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProfileService implements InterfaceProfile {

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

    @Override
    public List<Profile> getAllUsers() {
        return profileRepository.findAll();
    }

    @Override
    public Optional<Profile> getUserByUsername(String username) {
        return profileRepository.findByUsername(username);
    }

    public Optional<Profile> getUserById(String profileId){
        return profileRepository.findById(profileId);
    }

    public String createUser(RegisterRequestDTO registerDTO){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(5);
        var profile = new Profile(registerDTO.getUsername(), registerDTO.getEmail(), encoder.encode(registerDTO.getPassword()));
        profile.setFriends(new HashSet<String>());
        profile.setDescription("");
        profile.setUrlAvatar("");

        if(registerDTO.getUsername().isBlank() || registerDTO.getEmail().isBlank() || registerDTO.getPassword().isBlank()){
            return "Insira seus dados!";
        } else if (profileRepository.findByUsername(registerDTO.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Um usuário com esse username já existe");
        }   else if (profileRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Um usuário com esse email já existe");
        } else {
            profileRepository.save(profile);
            return "Usuário criado com sucesso!";
        }
    }

    @Override
    public AuthenticateResponseDTO login(LoginRequestDTO request) {
        Optional<Profile> optionalProfile = profileRepository.findByEmail(request.getEmail());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(5);
        var response = new AuthenticateResponseDTO();

        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            if( encoder.matches(request.getPassword(), profile.getPassword())){
                var token = jwtConfig.generateToken(profile.getId());
                response.setProfileId(profile.getId());
                response.setToken(token);
                return response;
            }
            else throw new RuntimeException("Senha incorreta!");
        }else {
            throw new NoSuchElementException("Usuário não encontrado com o email: " + request.getEmail());
        }
    }


    @Override
    public Profile editUser(String id, EditUserRequestDTO request) {
        return null;
    }

    @Override
    public String followUser(String id) {
        return null;
    }

    @Override
    public void deleteUser(String id) throws ChangeSetPersister.NotFoundException {

    }
}

