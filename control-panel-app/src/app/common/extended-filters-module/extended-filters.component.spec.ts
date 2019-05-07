import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedFiltersComponent } from './extended-filters.component';

describe('ExtendedFiltersComponent', () => {
  let component: ExtendedFiltersComponent;
  let fixture: ComponentFixture<ExtendedFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
