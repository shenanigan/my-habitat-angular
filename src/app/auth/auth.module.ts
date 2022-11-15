import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberComponent } from './presentation/ui/phone-number/phone-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './infrastructure/api/auth.service';
import { AbstractAuthService } from './domain/services/iauth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth.effects';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [PhoneNumberComponent],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSnackBarModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  providers:
    [
      {
        provide: AbstractAuthService, useClass: AuthService
      }]
})
export class AuthModule { }
