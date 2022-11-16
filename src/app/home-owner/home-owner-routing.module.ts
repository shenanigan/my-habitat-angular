import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentComponent } from './presentation/ui/resident/resident.component';

const routes: Routes = [
  { path: '', component: ResidentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeOwnerRoutingModule { }
