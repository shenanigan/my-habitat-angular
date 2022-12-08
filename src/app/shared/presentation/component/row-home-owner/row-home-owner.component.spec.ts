import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowHomeOwnerComponent } from './row-home-owner.component';

describe('RowHomeOwnerComponent', () => {
  let component: RowHomeOwnerComponent;
  let fixture: ComponentFixture<RowHomeOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowHomeOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowHomeOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
