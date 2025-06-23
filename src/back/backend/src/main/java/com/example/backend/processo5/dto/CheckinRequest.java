package com.example.backend.processo5.dto;


public class CheckinRequest {
    private String date;
    private String time;
    private String status;
    private String destino;
    private Long usuarioId; 
    private Long routeId;
    private String destinoPlaceId;
    private String saida;
    private String saidaPlaceId;

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getRouteId() { return routeId; }
    public void setRouteId(Long routeId) { this.routeId = routeId; }
    public String getDestinoPlaceId() { return destinoPlaceId; }
    public void setDestinoPlaceId(String destinoPlaceId) { this.destinoPlaceId = destinoPlaceId; }
    public String getSaida() { return saida; }
    public void setSaida(String saida) { this.saida = saida; }
    public String getSaidaPlaceId() { return saidaPlaceId; }
    public void setSaidaPlaceId(String saidaPlaceId) { this.saidaPlaceId = saidaPlaceId; }
}