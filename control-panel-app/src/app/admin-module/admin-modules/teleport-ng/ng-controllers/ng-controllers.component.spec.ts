import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgControllersComponent } from './ng-controllers.component';

describe('NgControllersComponent', () => {
  let component: NgControllersComponent;
  let fixture: ComponentFixture<NgControllersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgControllersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
