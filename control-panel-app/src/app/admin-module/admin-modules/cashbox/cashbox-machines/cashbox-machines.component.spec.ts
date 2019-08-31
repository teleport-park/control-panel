import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxMachinesComponent } from './cashbox-machines.component';

describe('CashboxMachinesComponent', () => {
  let component: CashboxMachinesComponent;
  let fixture: ComponentFixture<CashboxMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashboxMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
