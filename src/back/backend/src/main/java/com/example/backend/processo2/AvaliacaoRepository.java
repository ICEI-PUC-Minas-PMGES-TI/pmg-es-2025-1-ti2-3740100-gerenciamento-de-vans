package com.example.backend.processo2;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByIdMotorista(Long idMotorista);
    List<Avaliacao> findByIdUsuarioAvaliador(Long idUsuarioAvaliador);
} 