package com.example.mysocialbook.services;

import com.example.mysocialbook.repositories.PostRepository;
import com.example.mysocialbook.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private ProfileService profileService;

}
