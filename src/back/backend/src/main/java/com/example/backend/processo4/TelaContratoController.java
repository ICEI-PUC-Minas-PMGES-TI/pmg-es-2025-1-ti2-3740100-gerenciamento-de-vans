package com.example.backend.processo4;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;


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

    @PutMapping("/{id}/confirmar")
    public ResponseEntity<TelaContrato> confirmarContrato(@PathVariable Long id) {
    Optional<TelaContrato> contratoOptional = repository.findById(id);

        if (contratoOptional.isPresent()) {
            TelaContrato contrato = contratoOptional.get();
            contrato.setStatus("Contrato confirmado");
            repository.save(contrato);
            return ResponseEntity.ok(contrato);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable Long id) {
    System.out.println("Recebida requisição para excluir contrato com ID: " + id);
    if (repository.existsById(id)) {
        repository.deleteById(id);
        System.out.println("Contrato excluído com sucesso.");
        return ResponseEntity.noContent().build(); 
    }
    System.out.println("Contrato não encontrado.");
    return ResponseEntity.notFound().build(); 
}
}


