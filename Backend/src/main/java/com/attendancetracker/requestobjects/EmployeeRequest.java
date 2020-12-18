package com.attendancetracker.requestobjects;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest implements Serializable{
	
	private String email;
	private String name;
	private String password;
	private String organization;
	private String jobFunction;
	private String manager;
	private Integer hourlyWage;
	
	public Boolean isEmployee() {
		return this.email != null && this.name != null && this.password != null && this.hourlyWage != null;
	}
}
