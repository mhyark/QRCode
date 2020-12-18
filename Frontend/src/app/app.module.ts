import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { QrCodeModule } from 'ng-qrcode';
import { MatTabsModule } from '@angular/material/tabs';

import { DemoUtilsModule } from './calculator/utils/module';
import { ContextMenuModule } from 'ngx-contextmenu';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/app-routing.module';
import { CalculatorComponent } from './calculator/calculator.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QrAttendanceComponent } from './qr-attendance/qr-attendance.component';
import { MenuComponent } from './shared/menu/menu.component';

/* Services */
import { ApiService } from './services/api.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ViewAttendanceComponent,
    LoginComponent,
    ProfileComponent,
    QrAttendanceComponent,
    MenuComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    CommonModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    QrCodeModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    DemoUtilsModule,
    ContextMenuModule,
    MatTabsModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    ApiService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
