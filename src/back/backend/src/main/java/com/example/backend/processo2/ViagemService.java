package com.example.backend.processo2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ViagemService {
    @Autowired
    private ViagemRepository viagemRepository;

    public Viagem registrarCheckOut(Long idViagem) {
        Viagem viagem = viagemRepository.findById(idViagem).orElseThrow();
        viagem.setCheckOut(true);
        return viagemRepository.save(viagem);
    }

    public List<Viagem> listarViagensElegiveisParaAvaliacao(Long idPassageiro, LocalDate data) {
        // Apenas viagens do passageiro, na data, com checkOut true
        return viagemRepository.findAll().stream()
                .filter(v -> v.getIdPassageiro().equals(idPassageiro)
                        && v.getData().equals(data)
                        && v.isCheckOut())
                .toList();
    }

    public Viagem salvar(Viagem viagem) {
        return viagemRepository.save(viagem);
    }

    public List<Viagem> listarTodas() {
        return viagemRepository.findAll();
    }
} 