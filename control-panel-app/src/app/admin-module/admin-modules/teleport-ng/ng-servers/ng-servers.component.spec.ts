import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgServersComponent } from './ng-servers.component';

describe('NgServersComponent', () => {
  let component: NgServersComponent;
  let fixture: ComponentFixture<NgServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
