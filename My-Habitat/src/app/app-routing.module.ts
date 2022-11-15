import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AddFamilyComponent } from './add-family/add-family.component';
import { AddKidComponent } from './add-kid/add-kid.component';
import { EditFamilyComponent } from './edit-family/edit-family.component';
import { HomeComponent } from './home/home.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { OtpComponent } from './otp/otp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhoneNuberComponent } from './phone-nuber/phone-nuber.component';
import { ProfileComponent } from './profile/profile.component';
import { ResidentComponent } from './resident/resident.component';
import { SocietyIssueComponent } from './society-issue/society-issue.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {path: '', component:PhoneNuberComponent},
  { path: 'PhoneNumber', component: PhoneNuberComponent },
  { path: 'otp', component: OtpComponent },  
  {path: 'Noticeboard', component:NoticeboardComponent},
  {path:'Home', component:HomeComponent},
  {path:'Profile', component:ProfileComponent},
  {path:'SocietyIssue', component:SocietyIssueComponent},
  {path:'Terms' , component:TermsComponent},
  {path:'Resident', component:ResidentComponent},
  {path:'AddFamily', component:AddFamilyComponent},
  {path:'AddKid', component:AddKidComponent},
  {path:'EditFamily', component: EditFamilyComponent},
  { path: '**', component: PageNotFoundComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
