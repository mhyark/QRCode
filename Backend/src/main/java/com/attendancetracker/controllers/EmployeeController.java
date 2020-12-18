package com.attendancetracker.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendancetracker.entities.Employee;
import com.attendancetracker.repositories.EmployeeRepository;
import com.attendancetracker.repositories.WorkdayRepository;
import com.attendancetracker.requestobjects.EmployeeRequest;

@CrossOrigin("*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	/*
	@Autowired
	private AuthenticationManager authenticationManager;
	*/
	
	org.springframework.security.crypto.password.PasswordEncoder passwordEncoder
	   = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
	
	// GET mappings
	
	@GetMapping("")
    public ResponseEntity<Iterable<Employee>> getAll() {
        Iterable<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(employees);
	}
	
	@GetMapping("/{email}")
    public ResponseEntity<Employee> findEmployeeByEmail(@PathVariable String email) {
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        if (!employee.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(employee.get());
    }
	
	// POST mappings
	
	@PostMapping("/new")
	public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeRequest employReq) {
		Optional<Employee> employee = employeeRepository.findByEmail(employReq.getEmail());
		if (employee.isPresent() || !employReq.isEmployee()) {
			return ResponseEntity.badRequest().build();
		}
		String hashPassword = passwordEncoder.encode(employReq.getPassword());
		Employee newEmployee = new Employee(
				employReq.getEmail(), employReq.getName(), hashPassword, employReq.getOrganization(), 
				employReq.getJobFunction(), employReq.getManager(), 
				employReq.getHourlyWage(), new ArrayList<>()
		);
		return ResponseEntity.ok(employeeRepository.save(newEmployee));
	}
	
	@SuppressWarnings("rawtypes")
	@PostMapping("/login")
    public ResponseEntity login(@RequestBody EmployeeRequest employReq) {
		Optional<Employee> employee = employeeRepository.findByEmail(employReq.getEmail());
		if (!employee.isPresent() || !employReq.isEmployee()) {
			return ResponseEntity.badRequest().build();
		}
        if (!passwordEncoder.matches(employReq.getPassword(), employee.get().getPassword())) {
        	return ResponseEntity.status(403).body("Incorrect password");
        }
        
        /*
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(employReq.getName(), employReq.getPassword()));
        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        */
        return ResponseEntity.ok(employee.get());
    }
	
	//PUT mappings
	@PutMapping("/edit/{email}")
	public ResponseEntity<Employee> editEmployee(@PathVariable String email, @RequestBody EmployeeRequest employReq) {
		Optional<Employee> oEmployee = employeeRepository.findByEmail(employReq.getEmail());
		if (!oEmployee.isPresent() || !employReq.isEmployee()) {
			return ResponseEntity.badRequest().build();
		}
		Employee employee = oEmployee.get();
		String hashPassword = passwordEncoder.encode(employReq.getPassword());
		if (employee.getEmail() != null)
			employee.setEmail(employReq.getEmail());
		
		if (employee.getName() != null)
			employee.setName(employReq.getName());
		
		if (employReq.getPassword() != null)
        	employee.setPassword(hashPassword);
		
		if (employee.getOrganization() != null)
			employee.setOrganization(employReq.getOrganization());
		
		if (employee.getJobFunction() != null)
			employee.setJobFunction(employReq.getJobFunction());
		
		if (employee.getManager() != null)
			employee.setManager(employReq.getManager());
		
		if (employee.getHourlyWage() != null)
			employee.setHourlyWage(employReq.getHourlyWage());
		
		return ResponseEntity.ok(employeeRepository.save(employee));
	}
	
}
