import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocietyRoutingModule } from './society-routing.module';
import { NoticeboardComponent } from './presentation/ui/notices/noticeboard.component';
import { AbstractSocietyService } from './domain/services/isociety.service';
import { SocietyService } from './infrastructure/api/society.service';
import { NoticeboardEffects } from './+state/society.effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { societyFeatureName, societyReducer } from './+state/society.reducer';
import { StoreModule } from '@ngrx/store';
import { MockSocietyService } from './infrastructure/api/mock-society.service';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NoticeboardComponent],
  imports: [
    CommonModule,
    SocietyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatChipsModule,
    SharedModule,
    StoreModule.forFeature(societyFeatureName, societyReducer),
    EffectsModule.forFeature([NoticeboardEffects])
  ],
  providers: [
    {
      provide: AbstractSocietyService,
      useClass: SocietyService
    }
  ]
})
export class SocietyModule { }
