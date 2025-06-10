package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.processo1.Usuario;

public interface AvaliacaoUsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
} 