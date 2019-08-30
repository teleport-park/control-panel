import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MashinesComponent } from './mashines.component';

describe('MashinesComponent', () => {
  let component: MashinesComponent;
  let fixture: ComponentFixture<MashinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MashinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MashinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
