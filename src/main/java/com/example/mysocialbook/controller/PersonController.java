package com.example.mysocialbook.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(value = "API de exemplo")
public class PersonController {
    @ApiOperation(value = "Exemplo de endpoint", response = String.class)
    @GetMapping("/exemplo")
    public String exemplo() {
        return "Exemplo de API com Swagger";
    }
}
