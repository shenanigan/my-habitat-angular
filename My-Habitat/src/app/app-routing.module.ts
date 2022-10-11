import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { PhoneNuberComponent } from './phone-nuber/phone-nuber.component';

const routes: Routes = [
  { path: '', component: PhoneNuberComponent },
  { path: 'otp', component: OtpComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
