package com.vanwize.vanback.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vanwize.vanback.models.Checkin;
import com.vanwize.vanback.models.Route;
import com.vanwize.vanback.services.RouteServices;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;


@Controller
@RequestMapping("/routes")
public class RouteController {

  @Autowired
  public RouteServices routeServices;
  
  
  @PostMapping
  public ResponseEntity<Route> criarOuExpandirRota(@RequestBody Route route){
    Route savedRoute = routeServices.criarOuExpandirRota(route);
    return ResponseEntity.ok(savedRoute);    
  } 

 
  @GetMapping("/{id}")
    public ResponseEntity<Route> buscarRota(@PathVariable Long id) {
        Route rota = routeServices.routeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Rota não encontrada"));
        return ResponseEntity.ok(rota);
    }


  @PutMapping("/{id}/iniciar")
  public ResponseEntity<Route> iniciarRota(@PathVariable Long id){
    Route route = routeServices.iniciarRota(id);
    return ResponseEntity.ok(route);
  }

  @PutMapping("/{id}/pausar")
  public ResponseEntity<Route> pausarRota(@PathVariable Long id){
    Route route = routeServices.pausarRota(id);
    return ResponseEntity.ok(route);
  }

  @PutMapping("/{id}/finalizar")
  public ResponseEntity<Route> finalizarRota(@PathVariable Long id){
    Route route = routeServices.finalizarRota(id);
    return ResponseEntity.ok(route);
  }

  @PutMapping("/{id}/cancelar")
  public ResponseEntity<Route> cancelarRota(@PathVariable Long id){
    Route route = routeServices.cancelarRota(id);
    return ResponseEntity.ok(route);
  }


  
}
