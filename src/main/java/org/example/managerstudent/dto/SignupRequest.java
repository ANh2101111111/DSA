package org.example.managerstudent.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String password;
}
