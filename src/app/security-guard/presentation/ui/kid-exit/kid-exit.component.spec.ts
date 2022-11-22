import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidExitComponent } from './kid-exit.component';

describe('KidExitComponent', () => {
  let component: KidExitComponent;
  let fixture: ComponentFixture<KidExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidExitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
