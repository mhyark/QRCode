import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/models/UserModel';

@Component({
  selector: 'app-qr-attendance',
  templateUrl: './qr-attendance.component.html',
  styleUrls: ['./qr-attendance.component.scss']
})
export class QrAttendanceComponent implements OnInit {

  currentUser: User;

  workedHours: FormGroup;
  loggedintoday: boolean;
  initdone = false;
  hourcheck = false;
  inputHour = 0;
  QRdata = '';
  

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private authenticationService: AuthenticationService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {
    this.workedHours = this.formBuilder.group({
      hour: ['', [Validators.required]]
    });
    this.apiService.loggedInToday(this.currentUser.email).subscribe((data: any) => {
      console.log(data);
      this.loggedintoday = data;
      this.initdone = true;
    });
  }

  get hour() {
    return this.workedHours.get('hour');
  }
  
  btnSubmit() {
    this.hourcheck = true;
    this.QRdata = "localhost:8080/logday/hour/" + this.inputHour + "/email/" + this.currentUser.email;
  }
}
