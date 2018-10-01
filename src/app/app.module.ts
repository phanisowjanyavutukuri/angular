import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './modules/login/login.service';
import { HttpUtilityService } from './modules/common/http-utility.service';
import { HttpModule } from '@angular/http';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { SignupService } from './modules/signup/signup.service';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserUtilityService } from './modules/common/user-utility.service';
import { AuthGuard } from './modules/common/auth-guard.service';
import { LayoutComponent } from './modules/layout/layout.component';
import { HeaderService } from './modules/header/header.service';
import { UserInfoComponent } from './modules/user-info-header/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CalendarModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService, HttpUtilityService, DashboardService, SignupService, UserUtilityService, AuthGuard, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
