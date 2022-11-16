import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeboardComponent } from './presentation/ui/notices/noticeboard.component';

const routes: Routes = [
  { path: '', component: NoticeboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocietyRoutingModule { }
