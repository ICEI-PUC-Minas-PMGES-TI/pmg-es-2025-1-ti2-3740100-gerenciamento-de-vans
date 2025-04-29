package com.example.backend.cadastro;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TelaCadastroRepository extends JpaRepository<TelaCadastro, String> {
    boolean existsById(String cpf);
}

