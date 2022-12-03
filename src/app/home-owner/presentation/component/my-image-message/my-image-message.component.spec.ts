import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyImageMessageComponent } from './my-image-message.component';

describe('MyImageMessageComponent', () => {
  let component: MyImageMessageComponent;
  let fixture: ComponentFixture<MyImageMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyImageMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyImageMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
