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

  @Column(name = "checkin_date", nullable = false)
  @NotNull
  @FutureOrPresent
  private LocalDate date;

  @Column(name = "checkin_time", nullable = false, length = 5)
  @NotNull
  @NotEmpty
  @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  private String time;

  @Column(name = "checkin_destino", nullable = false)
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

  public Checkin(Long id, Usuario usuario, LocalDate date, String time, String destino, CheckinStatus status, Route route, String destinoPlaceId) {
    this.destinoPlaceId = destinoPlaceId;
    this.id = id;
    this.usuario = usuario;
    this.date = date;
    this.time = time;
    this.destino = destino;
    this.status = status;
    this.route = route;
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

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
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

  @Override
  public String toString() {
    return "Checkin [id=" + id + ", usuario=" + usuario + ", date=" + date + ", time=" + time 
      + ", destino=" + destino + ", status=" + status + ", route=" + route 
      + ", destinoPlaceId=" + destinoPlaceId + "]";
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == this)
      return true;
    if (obj == null) 
      return false; 
    if (!(obj instanceof Checkin)) 
      return false;       
    Checkin other = (Checkin) obj;
    if (this.id == null) 
      if (other.id != null) 
        return false;
      else if (!this.id.equals(other.id)) 
        return false;
    return Objects.equals(this.id, other.id) && Objects.equals(this.usuario, other.usuario) 
      && Objects.equals(this.date, other.date) && Objects.equals(this.time, other.time) 
      && this.status == other.status;
  }

  @Override
  public int hashCode(){
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }
}