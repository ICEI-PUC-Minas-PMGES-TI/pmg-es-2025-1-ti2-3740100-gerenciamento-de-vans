package com.example.backend.processo2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/viagens")
public class ViagemController {
    @Autowired
    private ViagemService viagemService;

    @PostMapping("/check-out/{idViagem}")
    public Viagem registrarCheckOut(@PathVariable Long idViagem) {
        return viagemService.registrarCheckOut(idViagem);
    }

    @GetMapping("/elegiveis")
    public List<Viagem> listarViagensElegiveis(@RequestParam Long idPassageiro, @RequestParam String data) {
        return viagemService.listarViagensElegiveisParaAvaliacao(idPassageiro, LocalDate.parse(data));
    }

    @PostMapping
    public Viagem salvar(@RequestBody Viagem viagem) {
        return viagemService.salvar(viagem);
    }

    @GetMapping
    public List<Viagem> listarTodas() {
        return viagemService.listarTodas();
    }
} 