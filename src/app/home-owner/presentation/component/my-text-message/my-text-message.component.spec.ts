import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTextMessageComponent } from './my-text-message.component';

describe('MyTextMessageComponent', () => {
  let component: MyTextMessageComponent;
  let fixture: ComponentFixture<MyTextMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTextMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTextMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
