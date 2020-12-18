package com.attendancetracker.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.attendancetracker.entities.Workday;

@Repository
public interface WorkdayRepository extends CrudRepository<Workday, Integer> {
	
	@Query("SELECT w FROM Workday w WHERE (w.employee.email) = ?1 AND MONTH(w.startTime) = ?2")
	public Iterable<Workday> findAllByMonth(String email, Integer month);
	
	@Query("SELECT w FROM Workday w WHERE (w.employee.email) = ?1 AND YEAR(w.startTime) = ?2 AND MONTH(w.startTime) = ?3 AND DAY(w.startTime) = ?4")
	public Optional<Workday> findByDate(String email, Integer year, Integer month, Integer day);
}
