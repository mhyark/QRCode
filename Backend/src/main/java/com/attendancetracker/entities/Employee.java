package com.attendancetracker.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employee")
public class Employee implements Serializable{
	
	@Id
	@Column(name = "EMAIL")
	@NotNull
	private String email;
	
	@Column(name = "NAME")
	@NotNull
	private String name;

	@Column(name = "PASSWORD")
	@NotNull
	private String password;
	
	@Column(name = "ORGANIZATION")
	private String organization;
	
	@Column(name = "JOB_FUNCTION")
	private String jobFunction;
	
	@Column(name = "MANAGER")
	private String manager;
	
	@Column(name = "HOURLY_WAGE")
	private Integer hourlyWage;
	
	@OneToMany(mappedBy="employee")
	private List<Workday> workdays;
}
