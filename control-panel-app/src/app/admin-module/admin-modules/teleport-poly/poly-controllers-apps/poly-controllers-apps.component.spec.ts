import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyControllersAppsComponent } from './poly-controllers-apps.component';

describe('PolyControllersAppsComponent', () => {
  let component: PolyControllersAppsComponent;
  let fixture: ComponentFixture<PolyControllersAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyControllersAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolyControllersAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
