package org.example.managerstudent.service;

import org.example.managerstudent.dto.LoginRequest;
import org.example.managerstudent.dto.SignupRequest;
import org.example.managerstudent.entity.User;
import org.example.managerstudent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public void signup(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already in use");
        }
        User users = new User();
        users.setEmail(signupRequest.getEmail());
        users.setPassword(signupRequest.getPassword());
        userRepository.save(users);
    }
    public User login(LoginRequest loginRequest) {
        return userRepository.findByEmail(loginRequest.getEmail())
                .filter(users -> users.getPassword().equals(loginRequest.getPassword()))
                .orElseThrow(() -> new RuntimeException("Email or password is incorrect"));
    }
}
