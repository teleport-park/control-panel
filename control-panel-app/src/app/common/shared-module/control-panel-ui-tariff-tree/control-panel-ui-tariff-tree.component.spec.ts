import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiTariffTreeComponent } from './control-panel-ui-tariff-tree.component';

describe('ControlPanelUiTariffTreeComponent', () => {
  let component: ControlPanelUiTariffTreeComponent;
  let fixture: ComponentFixture<ControlPanelUiTariffTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiTariffTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiTariffTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
