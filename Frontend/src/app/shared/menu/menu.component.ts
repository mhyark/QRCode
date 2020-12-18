import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  currentUser: any;
  collapsed = true;
  
  constructor(
  private router: Router,
  private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
  ngOnInit(): void {
  }

}
