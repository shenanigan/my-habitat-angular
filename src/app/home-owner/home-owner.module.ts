import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeOwnerRoutingModule } from './home-owner-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { homeOwnerFeatureName, homeOwnerReducer } from './+state/home-owner.reducer';
import { AbstractHomeOwnerService } from './domain/services/ihome-owner.service';
import { MockHomeOwnerService } from './infrastructure/api/mock-home-owner.service';
import { HomeOwnerEffects } from './+state/home-owner.effects';
import { ResidentComponent } from './presentation/ui/resident/resident.component';
import { HomeOwnerService } from './infrastructure/api/home-owner.service';


@NgModule({
  declarations: [ResidentComponent],
  imports: [
    CommonModule,
    HomeOwnerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    StoreModule.forFeature(homeOwnerFeatureName, homeOwnerReducer),
    EffectsModule.forFeature([HomeOwnerEffects])
  ],
  providers: [
    {
      provide: AbstractHomeOwnerService,
      useClass: HomeOwnerService
    }
  ]
})
export class HomeOwnerModule { }
