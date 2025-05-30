package com.vanwize.vanback.services;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vanwize.vanback.models.Checkin;
import com.vanwize.vanback.models.User;
import com.vanwize.vanback.repositories.CheckinRepository;

import jakarta.transaction.Transactional;

@Service
public class CheckinServices {

  @Autowired
  private CheckinRepository checkinRepository;

  @Autowired
  private UserService userService;
  
  public Checkin findById(long id){
    Optional<Checkin> checkin = this.checkinRepository.findById(id);
    return checkin.orElseThrow(() -> new RuntimeException("Checkin not found"));
 }
  //buscar checkin pelo id, depois atualizar os dados e salvar
  public List<Checkin> findAllByUserId(Long userId){
   List<Checkin> checkins = this.checkinRepository.findByUser_Id(userId);
   return checkins;
  }

 @Transactional
 public Checkin create(Checkin obj){
    User user = this.userService.findById(obj.getUser().getId());
    obj.setId(null);
    obj.setUser(user);
    obj = this.checkinRepository.save(obj);
    return obj;
 
  }
 

  @Transactional
  public Checkin update(Checkin obj){
    Checkin newObj = findById(obj.getId());
    newObj.setUser(obj.getUser());
    newObj.setDate(obj.getDate());
    newObj.setTime(obj.getTime());
    newObj.setDestino(obj.getDestino());
    return this.checkinRepository.save(newObj);

  }
  public List<Checkin> findAllByRouteId(Long routeId) {
    return checkinRepository.findByRouteId(routeId);
}

  public void delete(long id){
    findById(id);
    try {
      this.checkinRepository.deleteById(id);
    } catch (Exception e) {
      throw new RuntimeException("Cannot delete this checkin");
    }
  }

}
