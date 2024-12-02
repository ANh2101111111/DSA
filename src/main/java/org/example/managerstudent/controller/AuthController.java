package org.example.managerstudent.controller;

import org.example.managerstudent.dto.LoginRequest;
import org.example.managerstudent.dto.SignupRequest;
import org.example.managerstudent.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
        authService.signup(signupRequest);
        return ResponseEntity.ok(
                "Registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        authService.login(loginRequest);
        return ResponseEntity.ok("Log in successfully");
    }
}
