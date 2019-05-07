import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePeriodFieldComponent } from './date-period-field.component';

describe('PeriodFieldComponent', () => {
  let component: DatePeriodFieldComponent;
  let fixture: ComponentFixture<DatePeriodFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePeriodFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePeriodFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
