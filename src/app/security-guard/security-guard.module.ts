import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityGuardRoutingModule } from './security-guard-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeOwnerEffects } from '../home-owner/+state/home-owner.effects';
import { homeOwnerFeatureName, homeOwnerReducer } from '../home-owner/+state/home-owner.reducer';
import { SecurityGuardEffects } from './+state/security-guard.effects';
import { securityGuardFeatureName, securityGuardReducer } from './+state/security-guard.reducer';
import { AbstractSecurityGuardService } from './domain/services/isecurity-guard.service';
import { MockSecurityGuardService } from './infrastructure/api/mock-security-guard.service';
import { HomeComponent } from './presentation/ui/home/home.component';
import { KidExitComponent } from './presentation/ui/kid-exit/kid-exit.component';
import { AddFamilyComponent } from './presentation/ui/add-family/add-family.component';
import { SearchUnitComponent } from './presentation/ui/search-unit/search-unit.component';
import { MatCardModule } from '@angular/material/card';
import { SelectVisitorComponent } from './presentation/ui/select-visitor/select-visitor.component';
import { SecurityGuardService } from './infrastructure/api/security-guard.service';
import { RequestStatusComponent } from './presentation/ui/request-status/request-status.component';
import { AzureImageStorageService } from '../shared/infrastructure/storage/azure.service';
import { AbstractImageStorageService } from '../shared/domain/services/iimage-storage.service';


@NgModule({
  declarations: [HomeComponent,
    KidExitComponent,
    AddFamilyComponent,
    SearchUnitComponent,
    SelectVisitorComponent,
    RequestStatusComponent],
  imports: [
    CommonModule,
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
    MatCardModule,
    SharedModule,
    StoreModule.forFeature(securityGuardFeatureName, securityGuardReducer),
    EffectsModule.forFeature([SecurityGuardEffects]),
    SecurityGuardRoutingModule
  ], providers: [
    {
      provide: AbstractSecurityGuardService,
      useClass: SecurityGuardService
    },
    {
      provide: AbstractImageStorageService,
      useClass: AzureImageStorageService
    }
  ]
})
export class SecurityGuardModule { }
