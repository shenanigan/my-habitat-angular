import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeOwnerRoutingModule } from './home-owner-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { homeOwnerFeatureName, homeOwnerReducer } from './+state/home-owner.reducer';
import { AbstractHomeOwnerService } from './domain/services/ihome-owner.service';
import { MockHomeOwnerService } from './infrastructure/api/mock-home-owner.service';
import { HomeOwnerEffects } from './+state/home-owner.effects';
import { ResidentComponent } from './presentation/ui/resident/resident.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddFamilyComponent } from './presentation/ui/add-family/add-family.component';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '../shared/shared.module';
import { KidExitComponent } from './presentation/ui/kid-exit/kid-exit.component';
import { HomeComponent } from './presentation/ui/home/home.component';
import { VisitorsComponent } from './presentation/ui/visitors/visitors.component';


@NgModule({
  declarations: [ResidentComponent, AddFamilyComponent, KidExitComponent,
    HomeComponent, VisitorsComponent],
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
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    SharedModule,
    StoreModule.forFeature(homeOwnerFeatureName, homeOwnerReducer),
    EffectsModule.forFeature([HomeOwnerEffects])
  ],
  providers: [
    {
      provide: AbstractHomeOwnerService,
      useClass: MockHomeOwnerService
    }
  ]
})
export class HomeOwnerModule { }
