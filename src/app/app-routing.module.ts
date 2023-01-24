import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EditFamilyComponent } from './edit-family/edit-family.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SocietyIssueComponent } from './society-issue/society-issue.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'noticeboard',
    loadChildren: () =>
      import('./society/society.module').then((m) => m.SocietyModule),
  },
  {
    path: 'home-owner',
    loadChildren: () =>
      import('./home-owner/home-owner.module').then((m) => m.HomeOwnerModule),
  },
  {
    path: 'security-guard',
    loadChildren: () =>
      import('./security-guard/security-guard.module').then(
        (m) => m.SecurityGuardModule
      ),
  },
  { path: 'Profile', component: ProfileComponent },
  { path: 'SocietyIssue', component: SocietyIssueComponent },
  { path: 'Terms', component: TermsComponent },
  { path: 'EditFamily', component: EditFamilyComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
