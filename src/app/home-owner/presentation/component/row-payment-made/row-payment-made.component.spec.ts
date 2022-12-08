import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPaymentMadeComponent } from './row-payment-made.component';

describe('RowPaymentMadeComponent', () => {
  let component: RowPaymentMadeComponent;
  let fixture: ComponentFixture<RowPaymentMadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowPaymentMadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowPaymentMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
