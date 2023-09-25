package com.example.mysocialbook.repositories;

import com.example.mysocialbook.entities.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProfileRepository extends MongoRepository<Profile, String> {
    Optional<Profile> findByUsername(String username);

    Optional<Profile> findByEmail(String email);
}
