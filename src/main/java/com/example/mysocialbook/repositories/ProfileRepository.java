package com.example.mysocialbook.repositories;

import com.example.mysocialbook.entities.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends MongoRepository<Profile, String> {
    Optional<Profile> findByUsername(String username);

    Optional<Profile> findByEmail(String email);
}
