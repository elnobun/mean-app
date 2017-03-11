import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {FlashMessagesModule} from "angular2-flash-messages";
import {ToastOptions, ToastModule} from "ng2-toastr/ng2-toastr";

import { CustomOption } from './custom-option';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from './components/profile/profile.component';
import {appRoutingProviders, routing} from "./app.routes";
import {ValidationService} from "./services/validation.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    FlashMessagesModule,
    routing
  ],
  providers: [appRoutingProviders, ValidationService, AuthService, AuthGuard,
    {provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
