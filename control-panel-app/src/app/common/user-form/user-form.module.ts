import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component/user-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddOrEditUserDialogComponent } from './add-user-dialog/add-or-edit-user-dialog.component';
import { MaterialModule } from "../../material.module";
import { TranslationModule } from "../translations-module/translation.module";

@NgModule({
  declarations: [UserFormComponent, AddOrEditUserDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    TranslationModule
  ],
  exports: [UserFormComponent, AddOrEditUserDialogComponent],
  providers: []
})
export class UserFormModule {
}
