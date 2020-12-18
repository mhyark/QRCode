import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workday } from '../shared/models/WorkdayObject';
import { Employee } from '../shared/models/EmployeeObject';
import { AuthenticationService } from './authentication.service';
//import { User } from '../app/shared/models/userObject';
//import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly SERVER_URL = 'http://localhost:8080';

    constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

    private get options() {
        const headers = {
          'Content-Type': 'application/json'
        };
    
        const user = this.authService.currentUserValue;
        if (user !== null) {
          console.log(user.username + ' ' + user.password);
          const token = btoa(`${user.username}:${user.password}`);
          // tslint:disable-next-line: no-string-literal
          headers['Authorization'] = `Basic ${token}`;
        }
        return {
          headers: new HttpHeaders(headers)
        };
    }
    
    // GET mappings
    
    public getAllWorkdays(): Observable<any> {
        return this.httpClient.get(this.SERVER_URL + '/workdays');
    }

    public findWorkdayById(id: number): Observable<any> {
        return this.httpClient.get(this.SERVER_URL + '/workdays/' + id);
    }

    public getWorkdaysByMonths(email: string, month: number): Observable<any>  {
        return this.httpClient.get(this.SERVER_URL + '/workdays/month/' + email + '/' + month);
    }

    public loggedInToday(email: string): Observable<any>  {
        return this.httpClient.get(this.SERVER_URL + '/workdays/loggedintoday/' + email);
    }

    public getAllEmployees(): Observable<any> {
        return this.httpClient.get(this.SERVER_URL + '/employees');
    }

    public findEmployeeByEmail(email: string): Observable<any> {
        return this.httpClient.get(this.SERVER_URL + '/employees/' + email);
    }

    // POST mappings

    public createWorkday(email: string, workedhours: number): Observable<any> {
        const workday = new Workday();
        workday.employeeEmail = email;
        workday.workedHours = workedhours;
        const headers = { 'content-type': 'application/json'};
        const body = JSON.stringify(workday);
        return this.httpClient.post(this.SERVER_URL + '/workdays/logday', body, {headers});
    }

    public createEmployee(employObj: Employee): Observable<any> {   
        const headers = { 'content-type': 'application/json'};
        const body = JSON.stringify(employObj);
        return this.httpClient.post(this.SERVER_URL + '/employees/new', body, {headers});
    }

    public editEmployee(employObj: Employee) {
        const headers = { 'content-type': 'application/json'};
        const body = JSON.stringify(employObj);
        return this.httpClient.put(this.SERVER_URL + '/employees/edit/' + employObj.email, body, {headers});
    }
    
}
