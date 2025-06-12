package com.example.backend.avaliacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {
    @Autowired
    private EvaluationService evaluationService;

    @PostMapping
    public Evaluation createEvaluation(@RequestBody EvaluationDTO dto) {
        return evaluationService.createEvaluation(dto);
    }

    @PutMapping("/{id}")
    public Evaluation updateEvaluation(@PathVariable Long id, @RequestBody EvaluationDTO dto) {
        return evaluationService.updateEvaluation(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteEvaluation(@PathVariable Long id) {
        evaluationService.deleteEvaluation(id);
    }

    @GetMapping("/driver/{driverId}")
    public List<Evaluation> getEvaluationsForDriver(@PathVariable Long driverId) {
        return evaluationService.getEvaluationsForDriver(driverId);
    }

    @GetMapping("/can-evaluate")
    public boolean canEvaluateToday(@RequestParam Long userId, @RequestParam Long driverId) {
        return evaluationService.canEvaluateToday(userId, driverId);
    }
} 