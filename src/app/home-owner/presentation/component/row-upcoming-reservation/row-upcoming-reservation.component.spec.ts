import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowUpcomingReservationComponent } from './row-upcoming-reservation.component';

describe('RowUpcomingReservationComponent', () => {
  let component: RowUpcomingReservationComponent;
  let fixture: ComponentFixture<RowUpcomingReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowUpcomingReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowUpcomingReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
