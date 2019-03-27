import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiWidgetComponent } from './control-panel-ui-widget.component';

describe('ControlPanelUiWidgetComponent', () => {
  let component: ControlPanelUiWidgetComponent;
  let fixture: ComponentFixture<ControlPanelUiWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
