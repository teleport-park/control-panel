import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiTableComponent } from './control-panel-ui-table.component';

describe('ControlPanelUiTableComponent', () => {
  let component: ControlPanelUiTableComponent;
  let fixture: ComponentFixture<ControlPanelUiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
