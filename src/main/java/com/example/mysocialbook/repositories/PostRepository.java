package com.example.mysocialbook.repositories;

import com.example.mysocialbook.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    Set<Post> findByProfileIdIn(Set<String> friendIds);

    Set<Post> findByProfileId(String profileId);
}
