import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTariffsComponent } from './income-tariffs.component';

describe('IncomeTariffsComponent', () => {
  let component: IncomeTariffsComponent;
  let fixture: ComponentFixture<IncomeTariffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeTariffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
