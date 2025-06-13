package com.example.backend.processo2;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    Optional<Avaliacao> findByIdViagemAndDataAvaliacao(Long idViagem, LocalDate dataAvaliacao);
} 