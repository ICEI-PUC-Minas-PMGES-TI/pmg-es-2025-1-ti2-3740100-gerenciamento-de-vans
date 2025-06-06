package com.vanwize.vanback.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vanwize.vanback.models.Route;
import com.vanwize.vanback.repositories.CheckinRepository;
import com.vanwize.vanback.repositories.RouteRepository;

@Service
public class RouteServices {
  @Autowired
  public RouteRepository routeRepository;
  @Autowired
  private CheckinRepository checkinRepository;

  public Route criarOuExpandirRota(Route route){
    Route existingRoute = routeRepository.findByDate(route.getDate());
    
    if (existingRoute != null) {
      existingRoute.setTime(route.getTime());
      existingRoute.setStatus(route.getStatus());
      return routeRepository.save(existingRoute);
    } else {
      return routeRepository.save(route);
    }
  }

  public Route iniciarRota(Long id){
    Route route = routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Rota não encontrada"));
    route.setStatus(Route.RouteStatus.INICIADA);
    return routeRepository.save(route);  
  }
  
  public Route pausarRota(Long id){
    Route route = routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Rota não encontrada"));
    route.setStatus(Route.RouteStatus.PAUSADA);
    return routeRepository.save(route);
  }

  public Route finalizarRota(Long id){
    Route route = routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Rota não encontrada"));
    route.setStatus(Route.RouteStatus.COMPLETA);
    routeRepository.save(route);
    checkinRepository.deleteByRouteId(id);
    return route;
    
  }
  
  public Route cancelarRota(Long id){
    Route route = routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Rota não encontrada"));
    route.setStatus(Route.RouteStatus.CANCELADA);
    return routeRepository.save(route); 

  }

  public List<Route> getAllRoutes(){
    return routeRepository.findAll();
  }

  public void finalizarEExcluirRota(Long routeId) {
    checkinRepository.deleteByRouteId(routeId);
    routeRepository.deleteById(routeId);
}

}
