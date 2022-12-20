import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCompletedReservationComponent } from './row-completed-reservation.component';

describe('RowCompletedReservationComponent', () => {
  let component: RowCompletedReservationComponent;
  let fixture: ComponentFixture<RowCompletedReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowCompletedReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowCompletedReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
