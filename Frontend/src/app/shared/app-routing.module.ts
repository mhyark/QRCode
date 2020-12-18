import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* Modules */
import { CalculatorComponent } from '../calculator/calculator.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { QrAttendanceComponent } from '../qr-attendance/qr-attendance.component';
import { ViewAttendanceComponent } from '../view-attendance/view-attendance.component';
import { AuthGuard } from '../services/auth.guard';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
//import { QrAttendanceComponent } from '../qr-attendance/qr-attendance.component';

/* Services */
//import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: QrAttendanceComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'attendance', component: ViewAttendanceComponent, canActivate: [AuthGuard] },
    { path: 'calculator', component: CalculatorComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
