import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './presentation/ui/otp/otp.component';
import { PhoneNumberComponent } from './presentation/ui/phone-number/phone-number.component';

const routes: Routes = [
  { path: 'phone', component: PhoneNumberComponent },
  { path: 'otp', component: OtpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
