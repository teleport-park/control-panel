import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmusementComponent } from './amusement.component';

describe('AmusementComponent', () => {
  let component: AmusementComponent;
  let fixture: ComponentFixture<AmusementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmusementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmusementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
