package com.vanwize.vanback.models;

import java.sql.Date;
import java.util.Objects;

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
  @GeneratedValue ( strategy= GenerationType.IDENTITY)
  @Column(name = "id", unique = true)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false, updatable = false)
  private User user;

  @Column(name = "checkin_date", nullable = false)
  @NotNull
  @FutureOrPresent
  private Date date;

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


  public Checkin() {

  }

  public Checkin(Long id, User user, Date date, String time,String destino, CheckinStatus status, Route route) {
    this.id = id;
    this.user = user;
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

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
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
        
        return Objects.equals(this.id, other.id) && Objects.equals(this.user, other.user) 
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
