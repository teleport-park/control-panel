import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleportVrComponent } from './teleport-vr.component';

describe('TeleportVrComponent', () => {
  let component: TeleportVrComponent;
  let fixture: ComponentFixture<TeleportVrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleportVrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleportVrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
