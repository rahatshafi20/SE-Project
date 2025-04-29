package com.example.easypark.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_table") 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
}
