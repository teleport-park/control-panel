import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiQuickFilterComponent } from './control-panel-ui-quick-filter.component';

describe('ControlPanelUiQuickFilterComponent', () => {
  let component: ControlPanelUiQuickFilterComponent;
  let fixture: ComponentFixture<ControlPanelUiQuickFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiQuickFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiQuickFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
