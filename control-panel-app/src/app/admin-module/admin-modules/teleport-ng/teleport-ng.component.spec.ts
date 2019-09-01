import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleportNgComponent } from './teleport-ng.component';

describe('TeleportNgComponent', () => {
  let component: TeleportNgComponent;
  let fixture: ComponentFixture<TeleportNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleportNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleportNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
