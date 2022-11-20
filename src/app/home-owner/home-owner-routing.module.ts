import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './presentation/ui/home/home.component';
import { ResidentComponent } from './presentation/ui/resident/resident.component';

const routes: Routes = [
  { path: 'household', component: ResidentComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeOwnerRoutingModule { }
