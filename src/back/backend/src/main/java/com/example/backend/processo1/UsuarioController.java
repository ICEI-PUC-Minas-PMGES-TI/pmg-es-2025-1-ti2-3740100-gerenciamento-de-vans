package com.example.backend.processo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*") // permite chamadas de outros domínios
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Salvar novo usuário
    @PostMapping("/salvar")
    public Usuario salvarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @GetMapping("/teste")
    public ResponseEntity<?> testarUsuario(@RequestParam String email) {
        return ResponseEntity.ok(usuarioRepository.findByEmail(email));
}


    // Login por e-mail e senha
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuario = usuarioRepository.findByEmailAndSenha(
                loginRequest.getEmail(), loginRequest.getSenha()
        );

    if (usuario.isPresent()) {
        return ResponseEntity.ok(usuario.get());
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body("Email ou senha inválidos");
    }
}


    // Listar todos os usuários cadastrados
    @GetMapping("/listar")
    public Iterable<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }


    // Classe auxiliar para capturar email e senha
    public static class LoginRequest {
        private String email;
        private String senha;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }
    }


    // Endpoint para recuperar a senha (simulação)
    @PostMapping("/recover-password")
    public ResponseEntity<String> recuperarSenha(@RequestBody EmailRequest emailRequest) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(emailRequest.getEmail());

        if (usuario.isPresent()) {
            // Simula envio de e-mail (aqui apenas uma mensagem, sem envio real)
            return ResponseEntity.ok("Um link de recuperação foi enviado para seu email.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("Email não encontrado");
        }
    }

    // Classe auxiliar para capturar apenas o e-mail
    public static class EmailRequest {
        private String email;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

    }
}

