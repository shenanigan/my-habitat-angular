import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { OtpComponent } from './otp/otp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhoneNuberComponent } from './phone-nuber/phone-nuber.component';
import { SocietyIssueComponent } from './society-issue/society-issue.component';

const routes: Routes = [
  {path: '', component:PhoneNuberComponent},
  { path: 'PhoneNumber', component: PhoneNuberComponent },
  { path: 'otp', component: OtpComponent },  
  {path: 'Noticeboard', component:NoticeboardComponent},
  {path:'Home', component:HomeComponent},
  {path:'SocietyIssue', component:SocietyIssueComponent},
  { path: '**', component: PageNotFoundComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
