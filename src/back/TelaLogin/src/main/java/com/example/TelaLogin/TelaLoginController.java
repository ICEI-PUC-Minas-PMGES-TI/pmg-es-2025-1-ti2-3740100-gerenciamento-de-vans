package com.example.TelaLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173") // Permite o acesso do frontend
public class TelaLoginController {

    @Autowired
    private TelaLoginRepository loginRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody TelaLogin loginRequest) {
        Optional<TelaLogin> usuario = loginRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());

        if (usuario.isPresent()) {
            TelaLogin user = usuario.get();
            // Aqui é onde você pode adicionar a verificação de senha com hash
            if (user.getPassword().equals(loginRequest.getPassword())) {
                // Resposta de login bem-sucedido
                return ResponseEntity.ok("Login bem-sucedido!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha inválida");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email não encontrado");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody TelaLogin novoUsuario) {
        if (loginRepository.findByEmail(novoUsuario.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado");
        }
        loginRepository.save(novoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso");
}

}

