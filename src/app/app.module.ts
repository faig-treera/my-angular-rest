import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MyaccountComponent, ReservationDialog } from './pages/myaccount/myaccount.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    MyaccountComponent,
    ReservationDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,

  
  ],
  providers: [ReservationDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
