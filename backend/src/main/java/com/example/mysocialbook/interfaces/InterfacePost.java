package com.example.mysocialbook.interfaces;

import com.example.mysocialbook.dtos.PostRequestDTO;
import com.example.mysocialbook.entities.Post;

import java.util.List;
import java.util.Optional;

public interface InterfacePost {
    List<Post> getAllPosts();

    List<Post> getFriendPosts();

    Optional<Post> getPostById(String id);

    Post createPost(String userId, String title, String description, String urlImage);

    Post editPost(String id, PostRequestDTO request);

    String likePost(String id);

    String deletePost(String postId);
}