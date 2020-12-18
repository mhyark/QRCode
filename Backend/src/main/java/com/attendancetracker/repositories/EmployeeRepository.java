package com.attendancetracker.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.attendancetracker.entities.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Integer>{

	Optional<Employee> findByEmail(String employeeEmail);

}
