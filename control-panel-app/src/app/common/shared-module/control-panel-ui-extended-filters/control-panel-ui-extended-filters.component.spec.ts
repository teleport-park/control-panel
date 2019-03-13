import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiExtendedFiltersComponent } from './control-panel-ui-extended-filters.component';

describe('ControlPanelUiExtendedFiltersComponent', () => {
  let component: ControlPanelUiExtendedFiltersComponent;
  let fixture: ComponentFixture<ControlPanelUiExtendedFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiExtendedFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiExtendedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
