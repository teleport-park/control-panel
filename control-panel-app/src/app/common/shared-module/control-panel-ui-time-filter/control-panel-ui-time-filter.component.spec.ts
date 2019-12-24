import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiTimeFilterComponent } from './control-panel-ui-time-filter.component';

describe('ControlPanelUiTimeFilterComponent', () => {
  let component: ControlPanelUiTimeFilterComponent;
  let fixture: ComponentFixture<ControlPanelUiTimeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiTimeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiTimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
