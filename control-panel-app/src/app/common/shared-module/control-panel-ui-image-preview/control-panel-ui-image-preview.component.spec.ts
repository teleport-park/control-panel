import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelUiImagePreviewComponent } from './control-panel-ui-image-preview.component';

describe('ControlPanelUiImagePreviewComponent', () => {
  let component: ControlPanelUiImagePreviewComponent;
  let fixture: ComponentFixture<ControlPanelUiImagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelUiImagePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelUiImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
