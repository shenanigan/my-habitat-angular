import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './presentation/ui/reservations/reservations.component';
import { AddReservationComponent } from './presentation/ui/add-reservation/add-reservation.component';
import { ChatComponent } from './presentation/ui/chat/chat.component';
import { HomeComponent } from './presentation/ui/home/home.component';
import { PaymentsComponent } from './presentation/ui/payments/payments.component';
import { ResidentComponent } from './presentation/ui/resident/resident.component';
import { VisitorsComponent } from './presentation/ui/visitors/visitors.component';
import { ConfirmReservationComponent } from './presentation/ui/confirm-reservation/confirm-reservation.component';
import { BookingSummaryComponent } from './presentation/ui/booking-summary/booking-summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'household', component: ResidentComponent },
  { path: 'visits', component: VisitorsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'add-reservation', component: AddReservationComponent },
  { path: 'confirm-reservation', component: ConfirmReservationComponent },
  { path: 'booking-summary', component: BookingSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeOwnerRoutingModule {}
