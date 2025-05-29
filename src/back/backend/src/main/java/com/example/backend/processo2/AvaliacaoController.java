package com.example.backend.processo2;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {
    private final AvaliacaoRepository repository;

    public AvaliacaoController(AvaliacaoRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Avaliacao criarAvaliacao(@RequestBody Avaliacao avaliacao) {
        avaliacao.setData(java.time.LocalDateTime.now());
        return repository.save(avaliacao);
    }

    @GetMapping("/motorista/{id}")
    public List<Avaliacao> listarPorMotorista(@PathVariable Long id) {
        return repository.findByIdMotorista(id);
    }

    @GetMapping("/usuario/{id}")
    public List<Avaliacao> listarPorUsuario(@PathVariable Long id) {
        return repository.findByIdUsuarioAvaliador(id);
    }
} 