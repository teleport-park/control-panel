import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContanerComponent } from './admin-contaner.component';

describe('AdminContanerComponent', () => {
  let component: AdminContanerComponent;
  let fixture: ComponentFixture<AdminContanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
