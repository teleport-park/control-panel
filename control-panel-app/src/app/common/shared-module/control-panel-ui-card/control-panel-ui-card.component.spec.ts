import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiCardComponent } from './control-panel-ui-card.component';

describe('ControlPanelUiCardComponent', () => {
  let component: ControlPanelUiCardComponent;
  let fixture: ComponentFixture<ControlPanelUiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
