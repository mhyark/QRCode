import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Employee } from '../shared/models/EmployeeObject';
import { User } from '../shared/models/UserModel';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  currentUser: User;

  myForm: FormGroup;
  loading = false;
  loading2 = false;
  submitted = false;
  returnUrl: string;
  success = undefined;

  serverError = false;
  serverErrorMsg = 'Server side error. Please try again later.';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
      organization: [''],
      jobFunction: [''],
      manager: [''],
      hourlyWage: ['', [
        Validators.min(0)
      ]]
    });
  }
  
  onRegistSubmit() {
    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }

    var employee = new Employee();
    employee.name = this.myForm.controls.name.value;
    employee.password = this.myForm.controls.password.value;
    employee.organization = this.myForm.controls.organization.value;
    employee.jobFunction = this.myForm.controls.jobfunction.value;
    employee.manager = this.myForm.controls.manager.value;
    employee.hourlyWage = this.myForm.controls.hourlyWage.value;

    this.submitted = true;

    this.apiService.editEmployee(employee).subscribe((data: any) => {
      if (data) {
        this.success = true;
      } else {
        this.success = false;
      }
    });
  }

  get regEmail() {
    return this.myForm.get('email');
  }

  get regName() {
    return this.myForm.get('name');
  }

  get regPassword() {
    return this.myForm.get('password');
  }
  
  get regOrganization() {
    return this.myForm.get('organization');
  }

  get regJobFunction() {
    return this.myForm.get('jobFunction');
  }

  get regManager() {
    return this.myForm.get('manager');
  }

  get regHourlyWage() {
    return this.myForm.get('hourlyWage');
  }
}
