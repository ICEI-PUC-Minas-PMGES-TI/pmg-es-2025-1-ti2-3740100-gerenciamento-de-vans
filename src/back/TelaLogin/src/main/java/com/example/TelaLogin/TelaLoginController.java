package com.example.TelaLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173") // ou o domínio do front
public class TelaLoginController {

    @Autowired
    private TelaLoginRepository repository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody TelaLogin usuario) {
        if (repository.existsById(usuario.getEmail())) {
            return ResponseEntity.badRequest().body("Usuário já cadastrado");
        }
        repository.save(usuario);
        return ResponseEntity.ok("Usuário registrado com sucesso");
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody TelaLogin usuario) {
        return repository.findByEmailAndPassword(usuario.getEmail(), usuario.getPassword())
                .map(user -> ResponseEntity.ok("Login realizado com sucesso!"))
                .orElse(ResponseEntity.status(401).body("Email ou senha incorretos"));
    }
}
