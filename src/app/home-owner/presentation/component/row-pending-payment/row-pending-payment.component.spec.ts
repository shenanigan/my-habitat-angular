import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPendingPaymentComponent } from './row-pending-payment.component';

describe('RowPendingPaymentComponent', () => {
  let component: RowPendingPaymentComponent;
  let fixture: ComponentFixture<RowPendingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowPendingPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowPendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
