package com.example.TelaLogin;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TelaLoginRepository extends JpaRepository<TelaLogin, String> {
    Optional<TelaLogin> findByEmailAndPassword(String email, String password);
}
