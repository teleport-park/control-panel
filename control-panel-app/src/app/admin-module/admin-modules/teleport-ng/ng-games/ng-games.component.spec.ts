import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGamesComponent } from './ng-games.component';

describe('NgGamesComponent', () => {
  let component: NgGamesComponent;
  let fixture: ComponentFixture<NgGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
