package com.example.backend.processo5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.processo5.models.Route;

import java.time.LocalDate;

public interface RouteRepository extends JpaRepository<Route, Long> {
    Route findByDate(LocalDate date);
}