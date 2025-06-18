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
        // Buscar a viagem para validar
        Viagem viagem = viagemRepository.findById(avaliacao.getIdViagem())
            .orElseThrow(() -> new IllegalArgumentException("Viagem não encontrada."));

        LocalDate hoje = LocalDate.now();
        
        // Verifica se a viagem é do passageiro
        if (!viagem.getIdPassageiro().equals(avaliacao.getIdPassageiro())) {
            throw new IllegalArgumentException("Você não pode avaliar uma viagem que não é sua.");
        }

        // Verifica se já passou o prazo de 3 dias
        if (hoje.isAfter(viagem.getData().plusDays(3))) {
            throw new IllegalArgumentException("O prazo para avaliação expirou (3 dias após a viagem).");
        }

        // Verifica se já existe avaliação para esta viagem
        Optional<Avaliacao> existente = avaliacaoRepository.findByIdViagem(avaliacao.getIdViagem());
        if (existente.isPresent()) {
            throw new DataIntegrityViolationException("Já existe avaliação para esta viagem.");
        }

        // Verifica se já fez avaliação nos últimos 15 dias
        List<Avaliacao> avaliacoesRecentes = avaliacaoRepository.findByDataAvaliacaoBetween(
            hoje.minusDays(15), hoje);
        if (!avaliacoesRecentes.isEmpty()) {
            throw new IllegalArgumentException("Você já fez uma avaliação nos últimos 15 dias.");
        }

        // Define a data limite (3 dias após a viagem)
        avaliacao.setDataLimite(viagem.getData().plusDays(3));
        
        return avaliacaoRepository.save(avaliacao);
    }

    public List<Avaliacao> listarAvaliacoesPorPassageiro(Long idPassageiro) {
        return avaliacaoRepository.findByIdPassageiro(idPassageiro);
    }

    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAll();
    }
} 