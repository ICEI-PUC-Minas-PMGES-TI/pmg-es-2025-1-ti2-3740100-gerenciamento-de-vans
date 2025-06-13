package com.example.backend.processo1;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public Usuario findById(Long id) {
    Optional<Usuario> usuario = this.usuarioRepository.findById(id);
    return usuario.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
  }

  @Transactional
  public Usuario create(Usuario obj) {
    obj.setIdUsuario(null);
    obj = this.usuarioRepository.save(obj);
    return obj;
  }

   public void delete(Long id) {
    findById(id);
    try {
      this.usuarioRepository.deleteById(id);
    } catch (Exception e) {
      throw new RuntimeException("Não foi possível deletar o usuário: " + e.getMessage(), e);
    }
  }

  
}