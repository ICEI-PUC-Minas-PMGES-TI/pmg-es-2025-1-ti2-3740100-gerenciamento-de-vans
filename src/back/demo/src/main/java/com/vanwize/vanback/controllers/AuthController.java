package com.vanwize.vanback.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vanwize.vanback.dto.LoginRequest;
import com.vanwize.vanback.services.UserService;
import com.vanwize.vanback.models.User;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private UserService userService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());    
    if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
  }
}
