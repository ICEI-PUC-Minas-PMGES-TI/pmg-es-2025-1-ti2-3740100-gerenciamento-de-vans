package com.example.backend.processo2;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    Optional<Avaliacao> findByIdViagem(Long idViagem);
    List<Avaliacao> findByDataAvaliacaoBetween(LocalDate inicio, LocalDate fim);
    List<Avaliacao> findByIdPassageiro(Long idPassageiro);
} 