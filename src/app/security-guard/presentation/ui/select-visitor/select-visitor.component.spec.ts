import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVisitorComponent } from './select-visitor.component';

describe('SelectVisitor', () => {
  let component: SelectVisitorComponent;
  let fixture: ComponentFixture<SelectVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectVisitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
