package com.example.TelaLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173") // ou o domínio do front
public class TelaLoginController {

    @Autowired
    private TelaLoginRepository loginRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody TelaLogin loginRequest) {
        Optional<TelaLogin> usuario = loginRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());

        if (usuario.isPresent() && usuario.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login bem-sucedido!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
        }
    }
}
