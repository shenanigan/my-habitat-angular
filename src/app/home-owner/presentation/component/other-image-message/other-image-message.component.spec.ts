import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherImageMessageComponent } from './other-image-message.component';

describe('OtherImageMessageComponent', () => {
  let component: OtherImageMessageComponent;
  let fixture: ComponentFixture<OtherImageMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherImageMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherImageMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
