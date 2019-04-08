import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiHardwareItemComponent } from './control-panel-ui-hardware-item.component';

describe('ControlPanelUiHardwareItemComponent', () => {
  let component: ControlPanelUiHardwareItemComponent;
  let fixture: ComponentFixture<ControlPanelUiHardwareItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiHardwareItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiHardwareItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
