package com.example.backend.processo5.models;

import java.time.LocalDate;
import java.util.Objects;

import com.example.backend.processo1.Usuario; // Import correto

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = Checkin.TABLE_NAME)
public class Checkin {
  public static final String TABLE_NAME = "checkins";
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", unique = true)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false, updatable = false)
  private Usuario usuario;


  @Column(name = "checkin_time", length = 5)
  @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  private String time;

  @Column(name = "checkin_saida")
  private String saida;

  @Column(name = "saida_place_id")
  private String saidaPlaceId;

  @Column(name = "checkin_destino")
  private String destino;

  @Column(name = "checkin_status", nullable = false)
  @NotNull
  private CheckinStatus status;

  @ManyToOne
  @JoinColumn(name = "route_id", nullable = false)
  private Route route;

  @Column(name = "destino_place_id")
  private String destinoPlaceId;

  public Checkin() {}

  public Checkin(Long id, Usuario usuario, String time, String destino, CheckinStatus status, Route route, String destinoPlaceId, String saida, String saidaPlaceId) {
    this.destinoPlaceId = destinoPlaceId;
    this.id = id;
    this.usuario = usuario;
    this.time = time;
    this.destino = destino;
    this.status = status;
    this.route = route;
    this.saida = saida;
    this.saidaPlaceId = saidaPlaceId;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Usuario getUsuario() {
    return usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }


  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public CheckinStatus getStatus() {
    return status;
  }

  public void setStatus(CheckinStatus status) {
    this.status = status;
  }

  public String getDestino() {
    return destino;
  }

  public void setDestino(String destino){
    this.destino = destino;
  }

  public Route getRoute(){
    return route;
  }
  
  public void setRoute(Route route){
    this.route = route;
  }

  public enum CheckinStatus {
    CONFIRMED,
    CANCELED,
    PENDING
  }

  public String getDestinoPlaceId() {
    return destinoPlaceId;
  }

  public void setDestinoPlaceId(String destinoPlaceId) {
    this.destinoPlaceId = destinoPlaceId;
  }

  public String getSaida(){
    return saida;
  }

  public void setSaida(String saida){
    this.saida = saida;
  }

  public String getSaidaPlaceId(){
    return saidaPlaceId;
  }

  public void setSaidaPlaceId(String saidaPlaceId){
    this.saidaPlaceId = saidaPlaceId;
  }

  @Override
  public String toString() {
    return "Checkin [id=" + id + ", usuario=" + usuario + ", time=" + time 
      + ", destino=" + destino + ", destinoPlaceId=" + destinoPlaceId 
      + ", saida=" + saida + ", saidaPlaceId=" + saidaPlaceId 
      + ", status=" + status + ", route=" + route + "]";
  }


  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Checkin other = (Checkin) obj;
    return Objects.equals(id, other.id);
  }


  @Override
  public int hashCode(){
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }
}