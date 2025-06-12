package com.example.backend.avaliacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {
    @Autowired
    private DriverRepository driverRepository;

    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }
} 