package com.example.TelaContrato;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/contracts")
public class TelaContratoController {
    private final TelaContratoRepository repository;

    public TelaContratoController(TelaContratoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TelaContrato> getContracts() {
        return repository.findAll();
    }

    @PostMapping
    public TelaContrato addContract(@RequestBody TelaContrato newContract) {
        return repository.save(newContract);
    }
}
