import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { colors } from './utils/colors';

import { ApiService } from '../services/api.service';
import { User } from '../shared/models/UserModel';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  currentUser: User;

  myForm;

  workedDays = [];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  eventsInitial: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  sumWorkedHours = 0;
  sumPayment = 0;
  employeeData: any;
  employeeDataFetched = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, 
    private authenticationService: AuthenticationService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      addedWorkdays: this.formBuilder.array([]),
    });

    var today = new Date();
    var month = today.getMonth() + 1;
    this.apiService.getWorkdaysByMonths(this.currentUser.email, month).subscribe((data: any[]) => {
      console.log(data);
      this.workedDays = data;
      for (var i = 0; i < this.workedDays.length; i++) {
        var date = this.dateDeseralizer(this.workedDays[i].startTime);
        this.addEvent(date);
        this.addEvent2(date);
      }
      for (var i = 0; i < this.workedDays.length; i++) {
        this.sumWorkedHours += parseInt(this.workedDays[i].workedHours);
      }
      this.apiService.findEmployeeByEmail(this.currentUser.email).subscribe((data: any[]) => {
        this.employeeData = data;
        console.log(data);
        this.sumPayment = parseInt(this.employeeData.hourlyWage) * this.sumWorkedHours;
        this.employeeDataFetched = true;
      });
      console.log(this.events);
    });
  }

  get workdayForms() {
    return this.myForm.get('addedWorkdays') as FormArray;
  }

  addWorkday() {
    const workdayForm = this.formBuilder.group({
      date: [],
      hours: []
    });

    this.workdayForms.push(workdayForm);
  }

  deleteWorkday(i: number) {
    this.workdayForms.removeAt(i);
  }

  addEvent(date: Date): void {
    this.events.push({
      start: date,
      title: 'Workday',
      color: colors.red
    });
    this.refresh.next();
  }

  addEvent2(date: Date): void {
    this.eventsInitial.push({
      start: date,
      title: 'Workday',
      color: colors.red
    });
    this.refresh.next();
  }

  calculate() {
    this.events = [];
    for (var i=0; i<this.eventsInitial.length;i++) {
      this.addEvent(this.eventsInitial[i].start);
    }
    console.log('calculate');
    this.myForm.value.addedWorkdays.forEach(formelement => {
      console.log(formelement.date);
      console.log(formelement.hours);
      if(formelement.date != null && formelement.hours != null) {
        this.addEvent(this.dateDeseralizer(formelement.date));
        this.sumWorkedHours += parseInt(formelement.hours);
      } 
    });
  }

  dateDeseralizer(input: string) {
    const stringDate: string[] = input.split(/[.,\/ -/:]/);
    for (let i = 0; i < stringDate.length; i++) {
      if (stringDate[i] === '') {
        stringDate.splice(i, 1);
      }
    }
    var date = new Date();
    date.setFullYear(parseInt(stringDate[0]));
    date.setMonth(parseInt(stringDate[1]) - 1);
    date.setDate(parseInt(stringDate[2]));
    return date;
  }

}
