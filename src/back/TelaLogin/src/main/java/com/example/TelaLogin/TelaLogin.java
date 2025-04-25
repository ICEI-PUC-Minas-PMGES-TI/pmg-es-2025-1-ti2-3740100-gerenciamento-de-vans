package com.example.TelaLogin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class TelaLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto incremento
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;
    
    private String password;

    // Construtores
    public TelaLogin() {}

    public TelaLogin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

