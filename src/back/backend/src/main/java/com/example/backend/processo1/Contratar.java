package com.example.backend.processo1;



import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;


@Entity

public class Contratar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nome;
    private String email;
    private String telefone;
    private String endereco;
    private String entrada;
    private String saida;

    @Enumerated(EnumType.STRING)
    private Turno turno;

    @Enumerated(EnumType.STRING)
    private FormaPagamento formaPagamento;



    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getNome() {
        return nome;
    }


    public void setNome(String nome) {
        this.nome = nome;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getTelefone() {
        return telefone;
    }


    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }


    public String getEndereco() {
        return endereco;
    }


    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }


    public String getEntrada() {
        return entrada;
    }


    public void setEntrada(String entrada) {
        this.entrada = entrada;
    }


    public String getSaida() {
        return saida;
    }


    public void setSaida(String saida) {
        this.saida = saida;
    }


    public Turno getTurno() {
        return turno;
    }


    public void setTurno(Turno turno) {
        this.turno = turno;


    }


    public FormaPagamento getFormaPagamento() {
        return formaPagamento;
    }


    public void setFormaPagamento(FormaPagamento formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

   
}
