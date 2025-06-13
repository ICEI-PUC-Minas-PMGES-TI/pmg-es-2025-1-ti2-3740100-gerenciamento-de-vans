package com.example.backend.processo2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoService {
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private ViagemRepository viagemRepository;

    public Avaliacao registrarAvaliacao(Avaliacao avaliacao) {
        Optional<Avaliacao> existente = avaliacaoRepository.findByIdViagemAndDataAvaliacao(
            avaliacao.getIdViagem(), avaliacao.getDataAvaliacao()
        );
        if (existente.isPresent()) {
            throw new DataIntegrityViolationException("Já existe avaliação para esta viagem nesta data.");
        }
        // Buscar a viagem para validar a data
        Viagem viagem = viagemRepository.findById(avaliacao.getIdViagem())
            .orElseThrow(() -> new IllegalArgumentException("Viagem não encontrada."));
        LocalDate hoje = LocalDate.now();
        if (viagem.getData().isAfter(hoje)) {
            throw new IllegalArgumentException("Não é possível avaliar viagens futuras.");
        }
        return avaliacaoRepository.save(avaliacao);
    }

    public List<Avaliacao> listarAvaliacoesPorPassageiro(Long idPassageiro) {
        // Busca todas avaliações de viagens de um passageiro
        // (No futuro pode ser otimizado com query customizada)
        return avaliacaoRepository.findAll().stream()
                .filter(a -> a.getIdViagem() != null) // Precisa buscar viagem para checar passageiro
                .toList();
    }

    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAll();
    }
} 