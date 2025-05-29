package com.example.backend.processo2;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int nota; // 1 a 5
    private String descricao;
    private LocalDateTime data;
    private Long idUsuarioAvaliador;
    private Long idMotorista;
    private Long idViagem;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getNota() { return nota; }
    public void setNota(int nota) { this.nota = nota; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }
    public Long getIdUsuarioAvaliador() { return idUsuarioAvaliador; }
    public void setIdUsuarioAvaliador(Long idUsuarioAvaliador) { this.idUsuarioAvaliador = idUsuarioAvaliador; }
    public Long getIdMotorista() { return idMotorista; }
    public void setIdMotorista(Long idMotorista) { this.idMotorista = idMotorista; }
    public Long getIdViagem() { return idViagem; }
    public void setIdViagem(Long idViagem) { this.idViagem = idViagem; }
} 