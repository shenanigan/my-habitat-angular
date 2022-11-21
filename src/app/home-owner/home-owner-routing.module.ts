import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentComponent } from './presentation/ui/resident/resident.component';
import { VisitorsComponent } from './presentation/ui/visitors/visitors.component';

const routes: Routes = [
  { path: '', component: ResidentComponent },
  { path: 'visits', component: VisitorsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeOwnerRoutingModule { }
