import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiGateItemComponent } from './control-panel-ui-gate-item.component';

describe('ControlPanelUiGateItemComponent', () => {
  let component: ControlPanelUiGateItemComponent;
  let fixture: ComponentFixture<ControlPanelUiGateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiGateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiGateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
