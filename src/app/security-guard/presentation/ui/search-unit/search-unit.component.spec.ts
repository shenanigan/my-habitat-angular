import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUnitComponent } from './search-unit.component';

describe('SearchUnitComponent', () => {
  let component: SearchUnitComponent;
  let fixture: ComponentFixture<SearchUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
