package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motoristas")
@CrossOrigin(origins = "*")
public class MotoristaController {
    @Autowired
    private MotoristaRepository motoristaRepository;

    @GetMapping
    public List<Motorista> listarTodos() {
        return motoristaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Motorista buscarPorId(@PathVariable Long id) {
        return motoristaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Motorista cadastrar(@RequestBody Motorista motorista) {
        return motoristaRepository.save(motorista);
    }
} 