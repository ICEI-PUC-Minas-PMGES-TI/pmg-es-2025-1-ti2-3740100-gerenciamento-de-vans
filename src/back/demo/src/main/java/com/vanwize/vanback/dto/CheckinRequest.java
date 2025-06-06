package com.vanwize.vanback.dto;

public class CheckinRequest {
    private String date;
    private String time;
    private String status;
    private String destino;
    private Long userId;
    private Long routeId;

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getRouteId() { return routeId; }
    public void setRouteId(Long routeId) { this.routeId = routeId; }
}