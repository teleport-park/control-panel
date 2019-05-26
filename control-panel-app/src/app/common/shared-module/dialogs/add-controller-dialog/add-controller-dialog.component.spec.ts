import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddControllerDialogComponent } from './add-controller-dialog.component';

describe('AddControllerDialogComponent', () => {
  let component: AddControllerDialogComponent;
  let fixture: ComponentFixture<AddControllerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddControllerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddControllerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
