import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  sharedFeatureName,
  sharedReducer,
  initialState,
} from './+state/shared.reducer';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeaderComponent } from './presentation/component/header/header.component';
import { RowHomeOwnerComponent } from './presentation/component/row-home-owner/row-home-owner.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  exports: [HeaderComponent, QRCodeModule],
  declarations: [HeaderComponent, RowHomeOwnerComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    QRCodeModule,
    MatIconModule,
    MatProgressBarModule,
    StoreModule.forFeature(sharedFeatureName, sharedReducer, { initialState }),
  ],
})
export class SharedModule {}
