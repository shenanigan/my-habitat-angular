import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyIssueComponent } from './society-issue.component';

describe('SocietyIssueComponent', () => {
  let component: SocietyIssueComponent;
  let fixture: ComponentFixture<SocietyIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocietyIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
