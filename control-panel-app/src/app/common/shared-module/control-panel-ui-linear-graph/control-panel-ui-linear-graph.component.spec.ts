import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiLinearGraphComponent } from './control-panel-ui-linear-graph.component';

describe('ControlPanelUiLinearGraphComponent', () => {
  let component: ControlPanelUiLinearGraphComponent;
  let fixture: ComponentFixture<ControlPanelUiLinearGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiLinearGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiLinearGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
