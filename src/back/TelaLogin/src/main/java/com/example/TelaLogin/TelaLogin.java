package com.example.TelaLogin;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class TelaLogin {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY) // auto incremento
    private String email;

    private String password;

    public TelaLogin() {}

    public TelaLogin(String email, String password) {
        this.email = email;
        this.password = password;
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
