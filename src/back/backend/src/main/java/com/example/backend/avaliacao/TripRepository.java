package com.example.backend.avaliacao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserIdAndDateAndCheckedOutTrue(Long userId, LocalDate date);
} 