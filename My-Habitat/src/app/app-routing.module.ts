import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhoneNuberComponent } from './phone-nuber/phone-nuber.component';

const routes: Routes = [
  { path: 'PhoneNuber', component: PhoneNuberComponent },
  { path: 'otp', component: OtpComponent },
  {path:'',  redirectTo:'PhoneNuber', pathMatch:'full'},
  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
