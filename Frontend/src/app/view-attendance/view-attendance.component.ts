import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { Employee } from '../shared/models/EmployeeObject';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/models/UserModel';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit {
  currentUser: User;

  months = [];
  selectedMonth;
  searchText;
  workedDays = [];
  sumWorkedHours = 0;
  sumPayment = 0;
  employeeData: any;
  employeeDataFetched = false;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private authenticationService: AuthenticationService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    for (var i = 0; i <= 12; i++) {
      if(i<today.getMonth() + 1) {
        this.months.push(allMonths[i])
      }
    } 

    this.selectedMonth = this.formBuilder.group({
      month: new FormControl()
    });
  }

  onSelect() {
    console.log( parseInt(this.selectedMonth.get('month').value) + 1);
    var choosenMonth = parseInt(this.selectedMonth.get('month').value) + 1;
    this.apiService.getWorkdaysByMonths(this.currentUser.email, choosenMonth).subscribe((data: any[]) => {
      console.log(data);
      this.workedDays = data;
      for (var i = 0; i < this.workedDays.length; i++) {
        this.sumWorkedHours += parseInt(this.workedDays[i].workedHours);
      }
      this.apiService.findEmployeeByEmail(this.currentUser.email).subscribe((data: any[]) => {
        this.employeeData = data;
        console.log(data);
        this.sumPayment = parseInt(this.employeeData.hourlyWage) * this.sumWorkedHours;
        this.employeeDataFetched = true;
      });
    })
  }

}
