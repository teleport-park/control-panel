import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component/user-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@NgModule({
  declarations: [UserFormComponent, AddUserDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [UserFormComponent, AddUserDialogComponent]
})
export class UserFormModule {
}
