package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/avaliacoes")
@CrossOrigin(origins = "*")
public class AvaliacaoController {
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;
    @Autowired
    private MotoristaRepository motoristaRepository;

    @PostMapping
    public Avaliacao criarAvaliacao(@RequestBody AvaliacaoDTO dto) {
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setEstrelas(dto.getEstrelas());
        avaliacao.setComentario(dto.getComentario());
        Motorista motorista = motoristaRepository.findById(dto.getMotoristaId()).orElseThrow();
        avaliacao.setMotorista(motorista);
        return avaliacaoRepository.save(avaliacao);
    }

    // DTO para receber dados do frontend
    public static class AvaliacaoDTO {
        private Long motoristaId;
        private int estrelas;
        private String comentario;
        public Long getMotoristaId() { return motoristaId; }
        public void setMotoristaId(Long motoristaId) { this.motoristaId = motoristaId; }
        public int getEstrelas() { return estrelas; }
        public void setEstrelas(int estrelas) { this.estrelas = estrelas; }
        public String getComentario() { return comentario; }
        public void setComentario(String comentario) { this.comentario = comentario; }
    }
} 