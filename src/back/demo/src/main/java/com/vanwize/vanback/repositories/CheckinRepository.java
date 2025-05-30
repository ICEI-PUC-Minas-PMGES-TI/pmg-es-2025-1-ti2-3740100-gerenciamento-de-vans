package com.vanwize.vanback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vanwize.vanback.models.Checkin;

import jakarta.transaction.Transactional;

@Repository
public interface CheckinRepository extends JpaRepository<Checkin, Long> {
    List<Checkin> findByUser_Id(Long id);
    List<Checkin> findByRouteId(Long routeId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Checkin c WHERE c.route.id = :routeId")
    void deleteByRouteId(Long routeId);

}
