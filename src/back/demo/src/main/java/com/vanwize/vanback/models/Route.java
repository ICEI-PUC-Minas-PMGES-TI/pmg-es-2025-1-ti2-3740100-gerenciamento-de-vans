package com.vanwize.vanback.models;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = Route.TABLE_NAME)
public class Route {
	public static final String TABLE_NAME = "routes";

  @Id
  @GeneratedValue ( strategy= GenerationType.IDENTITY)
  @Column(name = "id", unique = true) 
  private Long id;
  
  @Column(name = "route_date")
  @FutureOrPresent
  private LocalDate date;

  @Column(name = "route_time", length = 5)
  @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$")
  private String time;



  @Enumerated(EnumType.STRING)
  @NotNull
  private RouteStatus status;

  
  @ManyToOne
  @JoinColumn(name = "driver_id" )
  private User driver;


  
  public Route() {
  }
  public Route(Long id, LocalDate date, String time,RouteStatus status, User driver) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.status = status;
    this.driver = driver;
  }

  public Long getId(){
    return id;
  }

  public void setId(Long id){
    this.id = id;
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


  public enum RouteStatus {
    PAUSADA,
    INICIADA,
    COMPLETA,
    CANCELADA
  }
  public RouteStatus getStatus() {
    return status;
  }
  public void setStatus(RouteStatus status) {
    this.status = status;
  }
  public User getDriver() {
    return driver;
  }
  public void setDriver(User driver) {
    this.driver = driver;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
        return true;
    if (obj == null || getClass() != obj.getClass())
        return false;
    Route other = (Route) obj;
    if (this.id == null) {
        if (other.id != null)
            return false;
    } else if (!this.id.equals(other.id))
        return false;
    return Objects.equals(this.date, other.date)
        && Objects.equals(this.time, other.time)
        && this.status == other.status
        && Objects.equals(this.driver, other.driver);
}

@Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    result = prime * result + ((date == null) ? 0 : date.hashCode());
    result = prime * result + ((time == null) ? 0 : time.hashCode());
    result = prime * result + ((status == null) ? 0 : status.hashCode());
    result = prime * result + ((driver == null) ? 0 : driver.hashCode());
    return result;
}

}
