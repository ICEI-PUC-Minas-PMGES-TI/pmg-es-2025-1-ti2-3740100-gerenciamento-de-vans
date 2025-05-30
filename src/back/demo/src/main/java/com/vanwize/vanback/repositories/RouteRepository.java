package com.vanwize.vanback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vanwize.vanback.models.Route;


import java.time.LocalDate;





public interface RouteRepository extends JpaRepository<Route, Long> {
      Route  findByDate (LocalDate date);
  }
