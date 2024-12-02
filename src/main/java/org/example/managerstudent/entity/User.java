package org.example.managerstudent.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;
@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @NotNull
    @Column(name = "password", nullable = false)
    private String password;
}
