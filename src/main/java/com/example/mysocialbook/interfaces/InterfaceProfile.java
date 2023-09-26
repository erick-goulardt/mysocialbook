package com.example.mysocialbook.interfaces;
import com.example.mysocialbook.dtos.AuthenticateResponseDTO;
import com.example.mysocialbook.dtos.EditUserRequestDTO;
import com.example.mysocialbook.dtos.LoginRequestDTO;
import com.example.mysocialbook.dtos.RegisterRequestDTO;
import com.example.mysocialbook.entities.Profile;
import org.springframework.data.crossstore.ChangeSetPersister;
import java.util.List;
import java.util.Optional;

public interface InterfaceProfile {
    List<Profile> getAllUsers();

    Optional<Profile> getUserByUsername(String username);

    Optional<Profile> getUserById(String userId);

    String createUser(RegisterRequestDTO request);

    AuthenticateResponseDTO login(LoginRequestDTO request);

    Profile editUser(String id, EditUserRequestDTO request);

    String followUser(String id);

    void deleteUser(String id) throws ChangeSetPersister.NotFoundException;
}
