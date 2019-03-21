import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditEntityDialogComponent } from './add-or-edit-entity-dialog.component';

describe('AddOrEditEntityDialogComponent', () => {
  let component: AddOrEditEntityDialogComponent;
  let fixture: ComponentFixture<AddOrEditEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
