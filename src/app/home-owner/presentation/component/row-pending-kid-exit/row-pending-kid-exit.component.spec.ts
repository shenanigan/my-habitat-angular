import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPendingKidExitComponent } from './row-pending-kid-exit.component';

describe('RowPendingKidExitComponent', () => {
  let component: RowPendingKidExitComponent;
  let fixture: ComponentFixture<RowPendingKidExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowPendingKidExitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowPendingKidExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
