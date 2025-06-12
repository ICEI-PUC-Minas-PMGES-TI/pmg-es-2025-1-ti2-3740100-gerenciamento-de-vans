package com.example.backend.avaliacao;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    @ManyToOne
    private Driver driver;

    private LocalDate date;
    private boolean checkedOut;

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Driver getDriver() { return driver; }
    public void setDriver(Driver driver) { this.driver = driver; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public boolean isCheckedOut() { return checkedOut; }
    public void setCheckedOut(boolean checkedOut) { this.checkedOut = checkedOut; }
} 