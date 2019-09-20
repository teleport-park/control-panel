import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelTriggerComponent } from './control-panel-trigger.component';

describe('ControlPanelTriggerComponent', () => {
  let component: ControlPanelTriggerComponent;
  let fixture: ComponentFixture<ControlPanelTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
