package com.example.backend.processo2;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Viagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long idPassageiro;

    @Column(nullable = false)
    private Long idMotorista;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private boolean checkOut = false;

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getIdPassageiro() { return idPassageiro; }
    public void setIdPassageiro(Long idPassageiro) { this.idPassageiro = idPassageiro; }
    public Long getIdMotorista() { return idMotorista; }
    public void setIdMotorista(Long idMotorista) { this.idMotorista = idMotorista; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public boolean isCheckOut() { return checkOut; }
    public void setCheckOut(boolean checkOut) { this.checkOut = checkOut; }
} 