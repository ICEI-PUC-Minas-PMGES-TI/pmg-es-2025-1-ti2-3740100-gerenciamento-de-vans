package com.example.TelaCadastro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class TelaCadastroController {

    @Autowired
    private TelaCadastroRepository repository;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody TelaCadastro cadastro) {
        try {
            // Verifica se os campos obrigatórios estão preenchidos
            if (cadastro.getNome() == null || cadastro.getNome().isEmpty() ||
                cadastro.getCpf() == null || cadastro.getCpf().isEmpty() ||
                cadastro.getDataNascimento() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Todos os campos obrigatórios devem ser preenchidos.");
            }

            // Validação simples de CPF duplicado
            if (repository.existsById(cadastro.getCpf())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("CPF já cadastrado.");
            }

            // Formatação da data de nascimento
            String dataNascimentoString = cadastro.getDataNascimento().toString();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dataNascimento = LocalDate.parse(dataNascimentoString, formatter);
            cadastro.setDataNascimento(dataNascimento);

            // Salva o cadastro no banco de dados
            TelaCadastro savedCadastro = repository.save(cadastro);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Cadastro realizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro no processamento do cadastro.");
        }
    }
}