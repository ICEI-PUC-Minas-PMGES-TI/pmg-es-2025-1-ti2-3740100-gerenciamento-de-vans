package com.example.TelaCadastro;

import org.springframework.data.repository.CrudRepository;

public interface TelaCadastroRepository extends CrudRepository<TelaCadastro, String> {

    boolean existsById(String cpf);
}
