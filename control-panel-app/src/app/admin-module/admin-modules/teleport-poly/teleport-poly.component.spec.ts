import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleportPolyComponent } from './teleport-poly.component';

describe('TeleportPolyComponent', () => {
  let component: TeleportPolyComponent;
  let fixture: ComponentFixture<TeleportPolyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleportPolyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleportPolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
