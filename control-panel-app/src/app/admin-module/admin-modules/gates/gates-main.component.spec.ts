import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatesMainComponent } from './gates-main.component';

describe('GatesMainComponent', () => {
  let component: GatesMainComponent;
  let fixture: ComponentFixture<GatesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
