import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Employee } from '../shared/models/EmployeeObject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registForm: FormGroup;
  loading = false;
  loading2 = false;
  submitted = false;
  returnUrl: string;
  // error: string;

  emailTaken = undefined;

  serverError = false;
  serverErrorMsg = 'Server side error. Please try again later.';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [ 
        Validators.required,
        Validators.email 
      ]],
      password: ['', [ Validators.required ]]
    });

    this.registForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
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

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onLoginSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.serverError = true;
            if (error.status === 401) {
              this.serverErrorMsg = 'Cannot find account with that email. Please register one!';
            }
            if (error.status === 403) {
              this.serverErrorMsg = 'Wrong password, please try again.';
            }
            this.loading = false;
        });
  }

  onRegistSubmit() {
    const newName = this.registForm.controls.name.value;
    const newEmail = this.registForm.controls.email.value;
    const newPassword = this.registForm.controls.password.value;
    const newOrganization = this.registForm.controls.organization.value;
    const newJobFunction = this.registForm.controls.jobfunction.value;
    const newManager = this.registForm.controls.manager.value;
    const newHourlyWage = this.registForm.controls.hourlyWage.value;

    this.submitted = true;

    // stop here if form is invalid
    if (this.registForm.invalid) {
        return;
    }

    this.loading2 = true;
      this.apiService.findEmployeeByEmail(newEmail).subscribe( data2 => {
        if (data2) {
          this.emailTaken = true;
        } else {
          this.emailTaken = false;
        }
        console.log(this.emailTaken);
        var employee = new Employee();
        employee.email = newEmail;
        employee.name = newName;
        employee.password = newPassword;
        employee.organization = newOrganization;
        employee.jobFunction = newJobFunction;
        employee.manager = newManager;
        employee.hourlyWage = newHourlyWage;
        if (!this.emailTaken) {
          this.apiService.createEmployee(employee).subscribe( data3 => {
                  console.log(data3);
                  this.authenticationService.login(newEmail, newPassword)
                    .pipe(first())
                      .subscribe(
                        data4 => {
                          this.router.navigate([this.returnUrl]);
                        },
                        error => {
                          this.serverError = true;
                          this.loading = false;
                      });
                }, error => {
                  this.serverError = true;
                  this.loading2 = false;
                });
        } else {
          console.log('user already registered');
          this.loading2 = false;
        }
      }, error => {
        console.log(error);
        this.serverError = true;
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get regEmail() {
    return this.registForm.get('email');
  }

  get regName() {
    return this.registForm.get('name');
  }

  get regPassword() {
    return this.registForm.get('password');
  }
  
  get regOrganization() {
    return this.registForm.get('organization');
  }

  get regJobFunction() {
    return this.registForm.get('jobFunction');
  }

  get regManager() {
    return this.registForm.get('manager');
  }

  get regHourlyWage() {
    return this.registForm.get('hourlyWage');
  }

}
