import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/models/UserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  employee;
  initdone = false;

  constructor(private apiService: ApiService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.apiService.findEmployeeByEmail(this.currentUser.email).subscribe((data: any) =>{
      this.employee = data;
      this.initdone = true;
    });
  }

}
