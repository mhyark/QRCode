import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/UserModel';
import * as bcrypt from 'bcryptjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private readonly SERVER_URL = 'http://localhost:8080';

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        console.log(email + ' ' + password);
        const user = new User();
        user.email = email;
        const salt = bcrypt.genSaltSync(10);
        const passEncrypt = bcrypt.hashSync(password, salt);
        user.password = passEncrypt;
        console.log(JSON.stringify(user));
        return this.httpClient.post(this.SERVER_URL + '/employees/login', JSON.stringify(user), this.options)
            // tslint:disable-next-line: no-shadowed-variable
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({...user, rawpassword: password}));
                console.log(user);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private get options() {
        const headers = { 'Content-Type': 'application/json' };
        /*
        if (window.localStorage.getItem('token')) {
          headers['Authorization'] = `Basic ${window.localStorage.getItem('token')}`;
        }
        */
        return {
          headers: new HttpHeaders(headers)
        };
      }
}
