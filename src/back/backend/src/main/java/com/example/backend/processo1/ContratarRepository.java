package com.example.backend.processo1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContratarRepository  extends JpaRepository<Contratar, Long> {
    // Aqui você adicionar métodos personalizados, se necessário
    // Por exemplo, para buscar por nome ou email
    // List<Contratar> findByNome(String nome);
    // List<Contratar> findByEmail(String email); 
}
