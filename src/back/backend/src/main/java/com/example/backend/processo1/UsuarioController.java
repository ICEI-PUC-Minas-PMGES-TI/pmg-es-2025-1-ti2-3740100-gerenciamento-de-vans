package com.example.backend.processo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*") // permite chamadas de outros domínios
public class UsuarioController {

    //=============================== REPOSITORIES =================================

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private VanRepository vanRepository;
    @Autowired
    private ContratarRepository contratarRepository;


    //==================================SALVAR USUÁRIO=================================


    // Salvar novo usuário
    @PostMapping("/salvar")
    public Usuario salvarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    //================================ TESTE USUÁRIO =================================

    @GetMapping("/teste")
    public ResponseEntity<?> testarUsuario(@RequestParam String email) {
        return ResponseEntity.ok(usuarioRepository.findByEmail(email));
}
    //================================== LOGIN USUÁRIO =================================


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

    //listar os passageiros
    @GetMapping("/listarResponsaveis")
        public List<Usuario> listarResponsaveis() {
        return usuarioRepository.findByTipoUsuario("responsavel");
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

    //==============================RECUPERAR A SENHA=================================


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

    //================================== CADASTRO DE VAN =================================

    // cadastrar uma van
    @PostMapping("/cadastrarvan")
    public ResponseEntity<?> cadastrarVan(@RequestBody CadastroVan van) {
        try {
            CadastroVan novaVan = vanRepository.save(van);
            return ResponseEntity.ok(novaVan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar van: " + e.getMessage());
        }
    }

    // (Opcional) Listar vans cadastradas
    @GetMapping("/listarvans")
    public ResponseEntity<?> listarVans() {
        return ResponseEntity.ok(vanRepository.findAll());
    }

    // deletar van pelo campo placa
    @DeleteMapping("/deletarvan/{placa}")
    public ResponseEntity<?> deletarVan(@PathVariable String placa) {
        try {
            CadastroVan van = vanRepository.findByPlaca(placa);
            if (van == null) {
                return ResponseEntity.status(404).body("Van não encontrada");
            }
            vanRepository.delete(van);
            return ResponseEntity.ok("Van deletada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao deletar van: " + e.getMessage());
        }
    }


    //================================ CONTRATAÇÃO DE VAN =================================


    //contratar
    @PostMapping("/contratar")
    public ResponseEntity<?> contratarVan(@RequestBody Contratar contratacao) {
        try {
            Contratar novaContratacao = contratarRepository.save(contratacao);
            return ResponseEntity.ok(novaContratacao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao contratar van: " + e.getMessage());
        }
    }

    // Listar todas as contratações
    @GetMapping("/listarcontratacoes")
    public ResponseEntity<?> listarContratacoes() {
        return ResponseEntity.ok(contratarRepository.findAll());
    }
}



