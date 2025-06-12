package com.example.backend.avaliacao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByDriverId(Long driverId);
    Optional<Evaluation> findByUserIdAndDriverIdAndDate(Long userId, Long driverId, LocalDate date);
    List<Evaluation> findByUserIdAndDate(Long userId, LocalDate date);
} 