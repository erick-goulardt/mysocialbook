package com.example.mysocialbook.controller;

import com.example.mysocialbook.dtos.PostRequestDTO;
import com.example.mysocialbook.dtos.PostResponseDTO;
import com.example.mysocialbook.entities.Post;
import com.example.mysocialbook.entities.Profile;
import com.example.mysocialbook.repositories.PostRepository;
import com.example.mysocialbook.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private PostRepository postRepository;
    @PostMapping("/create/{profileId}")
    public ResponseEntity<String> createPost(@PathVariable String profileId, @RequestBody PostRequestDTO postRequest) {
        Optional<Profile> optionalProfile = profileRepository.findById(profileId);

        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            Post post = new Post();
            post.setProfile(optionalProfile.get());
            post.setSubject(postRequest.getDescription());
            post.setTitle(postRequest.getTitle());
            post.setUrlImage(postRequest.getPhotoUrl());
            post.setCreated(LocalDate.now());
            postRepository.save(post);
            optionalProfile.get().getPosts().add(post);
            profileRepository.save(profile);
        } else {
            return new ResponseEntity<>("Algo de errado com o post", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Post criado com sucesso", HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId) {
        Post post = postRepository.findById(postId).orElse(null);

        if (post == null) {
            return new ResponseEntity<>("Post não encontrado", HttpStatus.NOT_FOUND);
        }

        Profile profile = post.getProfile();
        profile.getPosts().remove(post);
        profileRepository.save(profile);

        postRepository.deleteById(postId);
        return new ResponseEntity<>("Post excluído com sucesso", HttpStatus.OK);
    }

    @PutMapping("/edit/{postId}")
    public ResponseEntity<String> editPost(@PathVariable String postId, @RequestBody PostRequestDTO postRequest) {
        Post post = postRepository.findById(postId).orElse(null);

        if (post == null) {
            return new ResponseEntity<>("Post não encontrado", HttpStatus.NOT_FOUND);
        }

        post.setSubject(postRequest.getDescription());
        post.setTitle(postRequest.getTitle());
        post.setUrlImage(postRequest.getPhotoUrl());

        postRepository.save(post);

        return new ResponseEntity<>("Post atualizado com sucesso", HttpStatus.OK);
    }

    @GetMapping("/friendsPosts/{profileId}")
    public ResponseEntity<Set<PostResponseDTO>> getFriendsPosts(@PathVariable String profileId) {
        Profile profile = profileRepository.findById(profileId).orElse(null);

        if (profile == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Set<String> friendIds = profile.getFriends();
        Set<Post> friendsPosts = postRepository.findByProfileIdIn(friendIds);

        Set<PostResponseDTO> postResponses = friendsPosts.stream()
                .map(PostResponseDTO::mapToResponse)
                .collect(Collectors.toSet());

        return new ResponseEntity<>(postResponses, HttpStatus.OK);
    }

    @GetMapping("/userPosts/{profileId}")
    public ResponseEntity<Set<PostResponseDTO>> getPosts(@PathVariable String profileId) {
        Profile profile = profileRepository.findById(profileId).orElse(null);

        if (profile == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Set<Post> userPosts = postRepository.findByProfileId(profileId);

        Set<PostResponseDTO> postResponses = userPosts.stream()
                .map(PostResponseDTO::mapToResponse)
                .collect(Collectors.toSet());

        return new ResponseEntity<>(postResponses, HttpStatus.OK);
    }

    @PostMapping("/like/{postId}/{profileId}")
    public ResponseEntity<String> likePost(@PathVariable String postId, @PathVariable String profileId) {
        Post post = postRepository.findById(postId).orElse(null);
        Profile profile = profileRepository.findById(profileId).orElse(null);

        if (post == null || profile == null) {
            return new ResponseEntity<>("Post ou perfil não encontrado", HttpStatus.NOT_FOUND);
        }

        if (post.getLikes() != null && post.getLikes().contains(profileId)) {
            return new ResponseEntity<>("Você já curtiu este post", HttpStatus.BAD_REQUEST);
        }

        if (post.getLikes() == null) {
            post.setLikes(List.of(profileId));
        } else {
            post.getLikes().add(profileId);
        }

        postRepository.save(post);

        return new ResponseEntity<>("Você curtiu o post com sucesso", HttpStatus.OK);
    }
}


