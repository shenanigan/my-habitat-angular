import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKidComponent } from './add-kid.component';

describe('AddKidComponent', () => {
  let component: AddKidComponent;
  let fixture: ComponentFixture<AddKidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
