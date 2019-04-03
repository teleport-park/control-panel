import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiSelectionTableComponent } from './control-panel-ui-selection-table.component';

describe('ControlPanelUiSelectionTableComponent', () => {
  let component: ControlPanelUiSelectionTableComponent;
  let fixture: ComponentFixture<ControlPanelUiSelectionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiSelectionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiSelectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
