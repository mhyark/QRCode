package com.attendancetracker.requestobjects;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkdayRequest implements Serializable{

	private Integer workedHours;
    private String employeeEmail;
    
    public Boolean isWorkday() {
    	//return this.startTime != null && workedHours != null && this.employeeEmail != null;
    	return workedHours != null && this.employeeEmail != null;
    }
}
