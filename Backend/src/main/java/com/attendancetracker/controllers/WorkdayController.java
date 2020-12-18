package com.attendancetracker.controllers;

import java.util.Optional;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendancetracker.entities.Employee;
import com.attendancetracker.entities.Workday;
import com.attendancetracker.repositories.EmployeeRepository;
import com.attendancetracker.repositories.WorkdayRepository;
import com.attendancetracker.requestobjects.WorkdayRequest;

@CrossOrigin("*")
@RestController
@RequestMapping("/workdays")
public class WorkdayController {
	
	@Autowired
	private WorkdayRepository workdayRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	// GET mappings
	
	@GetMapping("")
    public ResponseEntity<Iterable<Workday>> getAll() {
        Iterable<Workday> workdays = workdayRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(workdays);
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Workday> findWorkdayById(@PathVariable Integer id) {
        Optional<Workday> workday = workdayRepository.findById(id);
        if (!workday.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(workday.get());
    }
	
	@GetMapping("/month/{email}/{month}")
	public ResponseEntity<Iterable<Workday>> getWorkdaysByMonths(@PathVariable String email, @PathVariable Integer month) {
		Iterable<Workday> workdays = workdayRepository.findAllByMonth(email, month);
		return ResponseEntity.status(HttpStatus.OK).body(workdays);
	}
	
	@SuppressWarnings("deprecation")
	@GetMapping("/loggedintoday/{email}")
	public ResponseEntity<Boolean> loggedInToday(@PathVariable String email) {
		Timestamp ts = new Timestamp(System.currentTimeMillis());
        Optional<Workday> workday = workdayRepository.findByDate(email,ts.getYear() + 1900, ts.getMonth() + 1, ts.getDate());
        if (workday.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.OK).body(false);
    }
	
	// POST mappings
	
	@PostMapping("/logday")
	public ResponseEntity<Workday> createWorkday(@RequestBody WorkdayRequest workdayReq) {
		Optional<Employee> employee = employeeRepository.findByEmail(workdayReq.getEmployeeEmail());
		if ( !employee.isPresent() || !workdayReq.isWorkday()) {
			System.out.println("THERE WAS SOME BAD DATAAAA AT CREATEWORKDAY!!!4!!");
			return ResponseEntity.badRequest().build();
		}
		Timestamp ts = new Timestamp(System.currentTimeMillis());
		Workday newWorkday = new Workday(0, ts, workdayReq.getWorkedHours(), employee.get());
		return ResponseEntity.ok(workdayRepository.save(newWorkday));
	}
}
