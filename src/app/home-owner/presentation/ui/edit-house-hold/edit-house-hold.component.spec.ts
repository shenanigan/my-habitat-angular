import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHouseHoldComponent } from './edit-house-hold.component';

describe('EditHouseHoldComponent', () => {
  let component: EditHouseHoldComponent;
  let fixture: ComponentFixture<EditHouseHoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHouseHoldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHouseHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
