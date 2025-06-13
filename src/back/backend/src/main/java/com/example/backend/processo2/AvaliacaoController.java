package com.example.backend.processo2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {
    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostMapping
    public ResponseEntity<?> registrarAvaliacao(@RequestBody Avaliacao avaliacao) {
        try {
            Avaliacao salva = avaliacaoService.registrarAvaliacao(avaliacao);
            return ResponseEntity.ok(salva);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/por-passageiro/{idPassageiro}")
    public List<Avaliacao> listarAvaliacoesPorPassageiro(@PathVariable Long idPassageiro) {
        return avaliacaoService.listarAvaliacoesPorPassageiro(idPassageiro);
    }

    @GetMapping
    public List<Avaliacao> listarTodas() {
        return avaliacaoService.listarTodas();
    }
} 