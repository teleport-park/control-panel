import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiPaymentComponent } from './control-panel-ui-payment.component';

describe('ControlPanelUiPaymentComponent', () => {
  let component: ControlPanelUiPaymentComponent;
  let fixture: ComponentFixture<ControlPanelUiPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
