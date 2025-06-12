package com.example.backend.avaliacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*")
public class TripController {
    @Autowired
    private TripRepository tripRepository;

    @GetMapping("/user/{userId}/today")
    public List<Trip> getTodayTripsForUser(@PathVariable Long userId) {
        LocalDate today = LocalDate.now();
        return tripRepository.findByUserIdAndDateAndCheckedOutTrue(userId, today);
    }
} 