import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrMachinesComponent } from './vr-machines.component';

describe('MashinesComponent', () => {
  let component: VrMachinesComponent;
  let fixture: ComponentFixture<VrMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
