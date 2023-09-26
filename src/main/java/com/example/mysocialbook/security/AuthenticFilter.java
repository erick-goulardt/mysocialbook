package com.example.mysocialbook.security;

import com.example.mysocialbook.interfaces.InterfaceJWTConfig;
import com.example.mysocialbook.services.ProfileService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthenticFilter extends OncePerRequestFilter {
    private  ProfileService profileService;
    private InterfaceJWTConfig jwtService;

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
            if(request.getServletPath().contains("/authentication")){
                filterChain.doFilter(request,response);
                return;
            }

            if(request.getServletPath().contains("swagger") || request.getServletPath().contains("docs")){
                filterChain.doFilter(request,response);
                return;
            }

            var token = request.getHeader("Authorization");
            var userId = request.getHeader("RequestedBy");

            if(token == null || userId == null || !token.startsWith("Bearer ")){
                response.getWriter().write("Usuário não autenticado!");
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }

            boolean isValidToken = false;

            try {
                isValidToken = jwtService.isValidToken(token.substring(7), userId);
            }catch (Exception e ){
                response.getWriter().write(e.getMessage());
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }

            if(isValidToken){
                try {
                    var user = profileService.getUserById(userId);
                    var authentication = new UsernamePasswordAuthenticationToken(user, null, null);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }catch (Exception e ){
                    response.getWriter().write(e.getMessage());
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    return;
                }
            }else {
                response.getWriter().write("Token inválido!");
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }
            filterChain.doFilter(request, response);
        }
    }