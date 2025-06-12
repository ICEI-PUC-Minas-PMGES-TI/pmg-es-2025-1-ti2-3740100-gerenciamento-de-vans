package com.example.backend.avaliacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class EvaluationService {
    @Autowired
    private EvaluationRepository evaluationRepository;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DriverRepository driverRepository;

    public Evaluation createEvaluation(EvaluationDTO dto) {
        Trip trip = tripRepository.findById(dto.tripId)
            .orElseThrow(() -> new RuntimeException("Viagem não encontrada"));
        if (!trip.isCheckedOut() || !trip.getDate().equals(LocalDate.now())) {
            throw new RuntimeException("Só é possível avaliar após o check-out no dia da viagem.");
        }
        if (evaluationRepository.findByUserIdAndDriverIdAndDate(dto.userId, dto.driverId, LocalDate.now()).isPresent()) {
            throw new RuntimeException("Já existe avaliação para esse motorista hoje.");
        }
        Evaluation evaluation = new Evaluation();
        evaluation.setUser(userRepository.findById(dto.userId).orElseThrow());
        evaluation.setDriver(driverRepository.findById(dto.driverId).orElseThrow());
        evaluation.setTrip(trip);
        evaluation.setRating(dto.rating);
        evaluation.setComment(dto.comment);
        evaluation.setDate(LocalDate.now());
        return evaluationRepository.save(evaluation);
    }

    public Evaluation updateEvaluation(Long id, EvaluationDTO dto) {
        Evaluation evaluation = evaluationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Avaliação não encontrada"));
        if (!evaluation.getDate().equals(LocalDate.now())) {
            throw new RuntimeException("Só é possível editar a avaliação no mesmo dia.");
        }
        evaluation.setRating(dto.rating);
        evaluation.setComment(dto.comment);
        return evaluationRepository.save(evaluation);
    }

    public void deleteEvaluation(Long id) {
        Evaluation evaluation = evaluationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Avaliação não encontrada"));
        if (!evaluation.getDate().equals(LocalDate.now())) {
            throw new RuntimeException("Só é possível excluir a avaliação no mesmo dia.");
        }
        evaluationRepository.delete(evaluation);
    }

    public List<Evaluation> getEvaluationsForDriver(Long driverId) {
        return evaluationRepository.findByDriverId(driverId);
    }

    public boolean canEvaluateToday(Long userId, Long driverId) {
        return evaluationRepository.findByUserIdAndDriverIdAndDate(userId, driverId, LocalDate.now()).isEmpty();
    }
} 