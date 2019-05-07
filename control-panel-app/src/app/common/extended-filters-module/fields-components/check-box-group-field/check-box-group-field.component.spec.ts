import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxGroupFieldComponent } from './check-box-group-field.component';

describe('CheckBoxGroupFieldComponent', () => {
  let component: CheckBoxGroupFieldComponent;
  let fixture: ComponentFixture<CheckBoxGroupFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxGroupFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxGroupFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
