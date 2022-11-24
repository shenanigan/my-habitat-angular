import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './presentation/ui/home/home.component';
import { RequestStatusComponent } from './presentation/ui/request-status/request-status.component';
import { SearchUnitComponent } from './presentation/ui/search-unit/search-unit.component';
import { SelectVisitorComponent } from './presentation/ui/select-visitor/select-visitor.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-unit', component: SearchUnitComponent },
  { path: 'select-visitor', component: SelectVisitorComponent },
  { path: 'request-status', component: RequestStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityGuardRoutingModule { }
