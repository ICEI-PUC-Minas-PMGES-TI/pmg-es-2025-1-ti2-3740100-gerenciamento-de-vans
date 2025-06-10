package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/avaliacoes")
@CrossOrigin(origins = "*")
public class AvaliacaoController {

    private static final Logger logger = LoggerFactory.getLogger(AvaliacaoController.class);

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @PostMapping
    public ResponseEntity<?> criarAvaliacao(@RequestBody AvaliacaoDTO avaliacaoDTO) {
        try {
            logger.info("Recebendo requisição de avaliação: {}", avaliacaoDTO);
            
            if (avaliacaoDTO.getMotoristaId() == null || avaliacaoDTO.getUsuarioId() == null) {
                logger.error("Dados inválidos: motoristaId ou usuarioId nulos");
                return ResponseEntity.badRequest().body(Map.of("message", "Dados inválidos"));
            }

            // Verifica se já existe uma avaliação deste usuário para este motorista na data atual
            LocalDate hoje = LocalDate.now();
            logger.info("Verificando avaliações para motorista {} na data {}", avaliacaoDTO.getMotoristaId(), hoje);
            
            List<Avaliacao> avaliacoesExistentes = avaliacaoRepository.findAllByMotoristaId(avaliacaoDTO.getMotoristaId());
            logger.info("Total de avaliações encontradas: {}", avaliacoesExistentes.size());
            
            // Log de todas as avaliações existentes
            avaliacoesExistentes.forEach(a -> 
                logger.info("Avaliação existente: id={}, motoristaId={}, usuarioId={}, data={}", 
                    a.getId(), a.getMotoristaId(), a.getUsuarioId(), a.getDataAvaliacao())
            );

            boolean jaAvaliouHoje = avaliacoesExistentes.stream()
                .anyMatch(a -> {
                    boolean mesmoUsuario = a.getUsuarioId().longValue() == avaliacaoDTO.getUsuarioId().longValue();
                    boolean mesmoDia = a.getDataAvaliacao().equals(hoje);
                    logger.info("Verificando avaliação: usuarioId={}, data={}, mesmoUsuario={}, mesmoDia={}", 
                        a.getUsuarioId(), a.getDataAvaliacao(), mesmoUsuario, mesmoDia);
                    return mesmoUsuario && mesmoDia;
                });

            if (jaAvaliouHoje) {
                logger.warn("Usuário {} já avaliou o motorista {} hoje", avaliacaoDTO.getUsuarioId(), avaliacaoDTO.getMotoristaId());
                return ResponseEntity.badRequest().body(Map.of(
                    "message", "Você já avaliou este motorista hoje. Tente novamente amanhã."
                ));
            }

            // Criar nova avaliação usando o construtor
            Avaliacao avaliacao = new Avaliacao(
                avaliacaoDTO.getMotoristaId(),
                avaliacaoDTO.getUsuarioId(),
                avaliacaoDTO.getNota(),
                avaliacaoDTO.getComentario(),
                hoje
            );

            logger.info("Salvando avaliação: {}", avaliacao);
            Avaliacao savedAvaliacao = avaliacaoRepository.save(avaliacao);
            logger.info("Avaliação salva com sucesso: {}", savedAvaliacao);

            return ResponseEntity.ok(savedAvaliacao);
        } catch (Exception e) {
            logger.error("Erro ao criar avaliação", e);
            return ResponseEntity.badRequest().body(Map.of("message", "Erro ao criar avaliação: " + e.getMessage()));
        }
    }

    @GetMapping("/motorista/{motoristaId}")
    public ResponseEntity<List<Avaliacao>> getAvaliacoesMotorista(@PathVariable Long motoristaId) {
        try {
            logger.info("Buscando avaliações para motorista: {}", motoristaId);
            List<Avaliacao> avaliacoes = avaliacaoRepository.findAllByMotoristaId(motoristaId);
            logger.info("Avaliações encontradas: {}", avaliacoes.size());
            return ResponseEntity.ok(avaliacoes);
        } catch (Exception e) {
            logger.error("Erro ao buscar avaliações", e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/motorista/{motoristaId}/estatisticas")
    public ResponseEntity<Map<String, Object>> getEstatisticasMotorista(@PathVariable Long motoristaId) {
        try {
            logger.info("Buscando estatísticas para motorista: {}", motoristaId);
            
            List<Avaliacao> avaliacoes = avaliacaoRepository.findAllByMotoristaId(motoristaId);
            logger.info("Avaliações encontradas: {}", avaliacoes.size());

            Map<String, Object> response = new HashMap<>();
            
            if (avaliacoes.isEmpty()) {
                logger.info("Nenhuma avaliação encontrada para o motorista");
                response.put("media", 0.0);
                response.put("totalAvaliacoes", 0);
                response.put("distribuicao", Map.of(
                    "1", 0, "2", 0, "3", 0, "4", 0, "5", 0
                ));
                return ResponseEntity.ok(response);
            }

            double media = avaliacoes.stream()
                .mapToInt(Avaliacao::getNota)
                .average()
                .orElse(0.0);

            Map<Integer, Long> distribuicao = avaliacoes.stream()
                .collect(Collectors.groupingBy(
                    Avaliacao::getNota,
                    Collectors.counting()
                ));

            // Garantir que todas as notas de 1 a 5 estejam presentes
            for (int i = 1; i <= 5; i++) {
                distribuicao.putIfAbsent(i, 0L);
            }

            response.put("media", media);
            response.put("totalAvaliacoes", avaliacoes.size());
            response.put("distribuicao", distribuicao);

            logger.info("Estatísticas calculadas: {}", response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Erro ao buscar estatísticas", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    public static class AvaliacaoDTO {
        private Long motoristaId;
        private Long usuarioId;
        private int nota;
        private String comentario;

        public Long getMotoristaId() {
            return motoristaId;
        }

        public void setMotoristaId(Long motoristaId) {
            this.motoristaId = motoristaId;
        }

        public Long getUsuarioId() {
            return usuarioId;
        }

        public void setUsuarioId(Long usuarioId) {
            this.usuarioId = usuarioId;
        }

        public int getNota() {
            return nota;
        }

        public void setNota(int nota) {
            this.nota = nota;
        }

        public String getComentario() {
            return comentario;
        }

        public void setComentario(String comentario) {
            this.comentario = comentario;
        }

        @Override
        public String toString() {
            return "AvaliacaoDTO{" +
                    "motoristaId=" + motoristaId +
                    ", usuarioId=" + usuarioId +
                    ", nota=" + nota +
                    ", comentario='" + comentario + '\'' +
                    '}';
        }
    }
} 