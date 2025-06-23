package com.example.backend.processo5.services;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.processo5.models.Checkin;
import com.example.backend.processo1.Usuario;
import com.example.backend.processo5.repositories.CheckinRepository;
import com.example.backend.processo1.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class CheckinServices {

  @Autowired
  private CheckinRepository checkinRepository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  public Checkin findById(long id) {
    Optional<Checkin> checkin = this.checkinRepository.findById(id);
    return checkin.orElseThrow(() -> new RuntimeException("Checkin not found"));
  }

  public List<Checkin> findAllByUsuarioId(Long usuarioId) {
    return this.checkinRepository.findByUsuario_Id(usuarioId);
  }

  public List<Checkin> findAll() {
    return checkinRepository.findAll();
  }

  @Transactional
  public Checkin create(Checkin obj) {
    Usuario usuario = this.usuarioRepository.findById(obj.getUsuario().getId())
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    obj.setId(null);
    obj.setUsuario(usuario);
    obj = this.checkinRepository.save(obj);
    return obj;
  }

  @Transactional
  public Checkin update(Checkin obj) {
    Checkin newObj = findById(obj.getId());
    newObj.setUsuario(obj.getUsuario());
    newObj.setTime(obj.getTime());
    newObj.setDestino(obj.getDestino());
    newObj.setStatus(obj.getStatus());
    newObj.setRoute(obj.getRoute());
    newObj.setDestinoPlaceId(obj.getDestinoPlaceId());
    newObj.setSaida(obj.getSaida());
    newObj.setSaidaPlaceId(obj.getSaidaPlaceId());
    return this.checkinRepository.save(newObj);
  }

  public List<Checkin> findAllByRouteId(Long routeId) {
    return checkinRepository.findByRouteId(routeId);
  }

  public void delete(long id) {
    findById(id);
    try {
      this.checkinRepository.deleteById(id);
    } catch (Exception e) {
      throw new RuntimeException("Cannot delete this checkin");
    }
  }
}