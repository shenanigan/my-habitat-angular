import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneNumberComponent } from './presentation/ui/phone-number/phone-number.component';

const routes: Routes = [
  { path: 'phone', component: PhoneNumberComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
