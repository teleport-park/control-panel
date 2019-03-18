import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiSelectionComponent } from './control-panel-ui-selection.component';

describe('ControlPanelUiSelectionComponent', () => {
  let component: ControlPanelUiSelectionComponent;
  let fixture: ComponentFixture<ControlPanelUiSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
