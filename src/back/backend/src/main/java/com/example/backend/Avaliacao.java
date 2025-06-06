package com.example.backend;

import jakarta.persistence.*;

@Entity
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "motorista_id")
    private Motorista motorista;

    private int estrelas;
    private String comentario;

    // Getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Motorista getMotorista() { return motorista; }
    public void setMotorista(Motorista motorista) { this.motorista = motorista; }
    public int getEstrelas() { return estrelas; }
    public void setEstrelas(int estrelas) { this.estrelas = estrelas; }
    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
} 