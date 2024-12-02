package org.example.managerstudent.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;
@Data
@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "student_code ",unique = true)
    private String studentCode;
    @NotNull
    @Column(name = "marks")
    private double marks;
    @NotNull
    @Column(name = "ranking")
    private String ranking;
}
