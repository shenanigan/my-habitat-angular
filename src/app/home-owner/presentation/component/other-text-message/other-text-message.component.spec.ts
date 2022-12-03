import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTextMessageComponent } from './other-text-message.component';

describe('OtherTextMessageComponent', () => {
  let component: OtherTextMessageComponent;
  let fixture: ComponentFixture<OtherTextMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherTextMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherTextMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
