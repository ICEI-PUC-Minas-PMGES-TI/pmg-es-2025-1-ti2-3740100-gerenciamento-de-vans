package com.example.backend.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:5173") // Permite o acesso do frontend
public class TelaLoginController {

    @Autowired
    private TelaLoginRepository loginRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody TelaLogin loginRequest) {
        Optional<TelaLogin> usuario = loginRepository.findByEmail(loginRequest.getEmail());

        if (usuario.isPresent()) {
            TelaLogin user = usuario.get();
            // Verificar se a senha fornecida corresponde ao hash armazenado
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
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

        // Criptografar a senha antes de salvar
        String hashedPassword = passwordEncoder.encode(novoUsuario.getPassword());
        novoUsuario.setPassword(hashedPassword);

        loginRepository.save(novoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso");
    }

    @PostMapping("/recover-password")
    public ResponseEntity<String> recoverPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        Optional<TelaLogin> usuario = loginRepository.findByEmail(email);

        if (usuario.isPresent()) {
            return ResponseEntity.ok("Email de recuperação enviado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não encontrado");
        }
    }

    @GetMapping("/usuarios")
    public ResponseEntity<Iterable<TelaLogin>> getAllUsuarios() {
    Iterable<TelaLogin> usuarios = loginRepository.findAll(); // Pega todos os usuários do banco
    return ResponseEntity.ok(usuarios); // Retorna os usuários com status OK
}

}

