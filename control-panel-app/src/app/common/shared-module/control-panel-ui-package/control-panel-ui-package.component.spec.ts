import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiPackageComponent } from './control-panel-ui-package.component';

describe('ControlPanelUiPackageComponent', () => {
  let component: ControlPanelUiPackageComponent;
  let fixture: ComponentFixture<ControlPanelUiPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
