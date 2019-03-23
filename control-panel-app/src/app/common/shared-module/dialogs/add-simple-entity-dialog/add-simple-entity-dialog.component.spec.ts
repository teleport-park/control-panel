import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSimpleEntityDialogComponent } from './add-simple-entity-dialog.component';

describe('AddSimpleEntityDialogComponent', () => {
  let component: AddSimpleEntityDialogComponent;
  let fixture: ComponentFixture<AddSimpleEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSimpleEntityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSimpleEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
