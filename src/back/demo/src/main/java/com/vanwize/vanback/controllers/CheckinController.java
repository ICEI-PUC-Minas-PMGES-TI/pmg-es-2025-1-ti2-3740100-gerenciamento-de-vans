package com.vanwize.vanback.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.vanwize.vanback.models.Checkin;
import com.vanwize.vanback.services.CheckinServices;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/checkin")
@Validated
public class CheckinController {
  
  @Autowired
  private CheckinServices checkinService;

  @Autowired
  private com.vanwize.vanback.repositories.CheckinRepository checkinRepository;

  @GetMapping("/{id}")
  public ResponseEntity<Checkin> findById(@PathVariable Long id) {
    Checkin obj = this.checkinService.findById(id);
    return ResponseEntity.ok(obj);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Checkin>> findAllByUserId(@PathVariable Long userId){
    this.checkinService.findById(userId);
    List<Checkin> objs = this.checkinService.findAllByUserId(userId);
    return ResponseEntity.ok().body(objs);
  }
  
  @PostMapping
  @Validated
  public ResponseEntity<Void> create(@Valid @RequestBody Checkin obj){
    this.checkinService.create(obj);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(obj.getId())
        .toUri();
    return ResponseEntity.created(uri).build();
  }
  
  @PutMapping("/checkin/{id}")
  public ResponseEntity<Void> update(@Valid @RequestBody Checkin obj, @PathVariable Long id){
    obj.setId(id);
    this.checkinService.update(obj);
    return ResponseEntity.noContent().build();
  }

  

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id){
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

  
}
