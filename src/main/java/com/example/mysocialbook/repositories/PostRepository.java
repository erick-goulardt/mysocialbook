package com.example.mysocialbook.repositories;

import com.example.mysocialbook.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}
