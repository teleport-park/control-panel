import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiActionToolbarComponent } from './control-panel-ui-action-toolbar.component';

describe('ControlPanelUiActionToolbarComponent', () => {
  let component: ControlPanelUiActionToolbarComponent;
  let fixture: ComponentFixture<ControlPanelUiActionToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiActionToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiActionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
