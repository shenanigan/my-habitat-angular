import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  FormsModule , ReactiveFormsModule } from '@angular/forms';
import { PhoneNuberComponent } from './phone-nuber/phone-nuber.component';
import { OtpComponent } from './otp/otp.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { MatButtonModule  }  from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { SocietyIssueComponent } from './society-issue/society-issue.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TermsComponent } from './terms/terms.component';
import { ResidentComponent } from './resident/resident.component';


  
@NgModule({
  declarations: [
    AppComponent,
    PhoneNuberComponent,
    OtpComponent,
    SignInComponent,
    PageNotFoundComponent,
    NoticeboardComponent,
    SocietyIssueComponent,
    HomeComponent,
    ProfileComponent,
    TermsComponent,
    ResidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
