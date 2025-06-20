package com.example.backend.processo5.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.backend.processo5.dto.CheckinRequest;
import com.example.backend.processo5.models.Checkin;
import com.example.backend.processo5.models.Route;
import com.example.backend.processo1.Usuario;
import com.example.backend.processo5.repositories.RouteRepository;
import com.example.backend.processo1.UsuarioRepository;
import com.example.backend.processo5.services.CheckinServices;
import com.example.backend.processo5.repositories.CheckinRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/checkins")
@Validated
public class CheckinController {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private RouteRepository routeRepository;

  @Autowired
  private CheckinServices checkinService;

  @Autowired
  private CheckinRepository checkinRepository;

  @GetMapping("/{id}")
  public ResponseEntity<Checkin> findById(@PathVariable Long id) {
    Checkin obj = this.checkinService.findById(id);
    return ResponseEntity.ok(obj);
  }

  @GetMapping("/usuario/{usuarioId}")
  public ResponseEntity<List<Checkin>> findAllByUsuarioId(@PathVariable Long usuarioId) {
    List<Checkin> objs = this.checkinService.findAllByUsuarioId(usuarioId);
    return ResponseEntity.ok().body(objs);
  }

  @GetMapping
  public ResponseEntity<List<Checkin>> findAll() {
    List<Checkin> objs = this.checkinService.findAll();
    return ResponseEntity.ok().body(objs);
  }

  @PostMapping
  @Validated
  public ResponseEntity<Void> create(@Valid @RequestBody CheckinRequest req) {
    if (req.getUsuarioId() == null) {
        throw new IllegalArgumentException("usuarioId não pode ser nulo");
    }
    Usuario usuario = usuarioRepository.findById(req.getUsuarioId()).orElseThrow();
    Route route = routeRepository.findById(req.getRouteId()).orElseThrow();

    Checkin checkin = new Checkin();

    checkin.setTime(req.getTime());
    checkin.setStatus(Checkin.CheckinStatus.valueOf(req.getStatus()));
    checkin.setDestino(req.getDestino());
    checkin.setDestinoPlaceId(req.getDestinoPlaceId());
    checkin.setSaida(req.getSaida());
    checkin.setSaidaPlaceId(req.getSaidaPlaceId());
    checkin.setUsuario(usuario);
    checkin.setRoute(route);

    checkinRepository.save(checkin);

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> update(@Valid @RequestBody Checkin obj, @PathVariable Long id) {
    obj.setId(id);
    this.checkinService.update(obj);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    this.checkinService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/routes/{routeId}/checkins")
  public ResponseEntity<List<Checkin>> listarCheckinsPorRota(@PathVariable Long routeId) {
    List<Checkin> checkins = checkinRepository.findByRouteId(routeId);
    return ResponseEntity.ok(checkins);
  }

  @GetMapping("/route/{routeId}")
  public List<Checkin> findAllByRouteId(@PathVariable Long routeId) {
    return checkinService.findAllByRouteId(routeId);
  }

  @GetMapping("/checkins")
  public List<Checkin> getAllCheckins() {
    return checkinRepository.findAll();
  }
}