package com.example.backend.processo1;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface VanRepository extends JpaRepository<CadastroVan, Long> {
    CadastroVan findByPlaca(String placa);
}

