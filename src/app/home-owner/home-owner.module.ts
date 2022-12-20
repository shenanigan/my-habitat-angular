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
import { HomeOwnerService } from './infrastructure/api/home-owner.service';
import { LogComponent } from './presentation/component/log/log.component';
import { AzureImageStorageService } from '../shared/infrastructure/storage/azure.service';
import { AbstractImageStorageService } from '../shared/domain/services/iimage-storage.service';
import { MyTextMessageComponent } from './presentation/component/my-text-message/my-text-message.component';
import { MyImageMessageComponent } from './presentation/component/my-image-message/my-image-message.component';
import { OtherImageMessageComponent } from './presentation/component/other-image-message/other-image-message.component';
import { OtherTextMessageComponent } from './presentation/component/other-text-message/other-text-message.component';
import { ChatComponent } from './presentation/ui/chat/chat.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { PaymentsComponent } from './presentation/ui/payments/payments.component';
import { RowPendingPaymentComponent } from './presentation/component/row-pending-payment/row-pending-payment.component';
import { RowPaymentMadeComponent } from './presentation/component/row-payment-made/row-payment-made.component';
import { ReservationsComponent } from './presentation/ui/reservations/reservations.component';
import { AddReservationComponent } from './presentation/ui/add-reservation/add-reservation.component';
import { RowUpcomingReservationComponent } from './presentation/component/row-upcoming-reservation/row-upcoming-reservation.component';
import { RowCompletedReservationComponent } from './presentation/component/row-completed-reservation/row-completed-reservation.component';


@NgModule({
  declarations: [ResidentComponent,
    AddFamilyComponent,
    KidExitComponent,
    HomeComponent,
    VisitorsComponent,
    LogComponent,
    ChatComponent,
    MyTextMessageComponent,
    MyImageMessageComponent,
    OtherImageMessageComponent,
    OtherTextMessageComponent,
    PaymentsComponent,
    RowPendingPaymentComponent,
    RowPaymentMadeComponent,
    ReservationsComponent,
    AddReservationComponent,
    RowUpcomingReservationComponent,
    RowCompletedReservationComponent],
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
    NgImageFullscreenViewModule,
    StoreModule.forFeature(homeOwnerFeatureName, homeOwnerReducer),
    EffectsModule.forFeature([HomeOwnerEffects])
  ],
  providers: [
    {
      provide: AbstractHomeOwnerService,
      useClass: HomeOwnerService
    },
    {
      provide: AbstractImageStorageService,
      useClass: AzureImageStorageService
    }
  ]
})
export class HomeOwnerModule { }
