import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiPeriodSelectorComponent } from './control-panel-ui-period-selector.component';

describe('ControlPanelUiPeriodSelectorComponent', () => {
  let component: ControlPanelUiPeriodSelectorComponent;
  let fixture: ComponentFixture<ControlPanelUiPeriodSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiPeriodSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiPeriodSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
