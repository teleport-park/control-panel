import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyServersComponent } from './poly-servers.component';

describe('PolyServersComponent', () => {
  let component: PolyServersComponent;
  let fixture: ComponentFixture<PolyServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolyServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
