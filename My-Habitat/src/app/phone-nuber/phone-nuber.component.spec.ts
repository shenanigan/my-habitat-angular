import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNuberComponent } from './phone-nuber.component';

describe('PhoneNuberComponent', () => {
  let component: PhoneNuberComponent;
  let fixture: ComponentFixture<PhoneNuberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneNuberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneNuberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
