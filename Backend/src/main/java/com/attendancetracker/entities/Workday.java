package com.attendancetracker.entities;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "workday")
public class Workday implements  Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "WORKDAY_ID")
	@NotNull
	private Integer id;
	
	
	@Column(name = "START_TIME")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd. HH:mm", timezone = "GMT+1")
	private Timestamp startTime;
	
	@Column(name = "WORKED_HOURS")
	private Integer workedHours;
	
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name="employee_EMAIL", nullable=false)
    private Employee employee;

}
