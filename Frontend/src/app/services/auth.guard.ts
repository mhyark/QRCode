import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        //const expectedRole = route.data.role;
        if (currentUser === null) {
            this.router.navigate(['/login']);
            return false;
        }
        /*
        if (expectedRole !== undefined && currentUser.role !== expectedRole) {
            console.log(expectedRole);
            console.log(currentUser.role);
            this.router.navigate(['/home']);
        }
        */
        return true;
    }
}
