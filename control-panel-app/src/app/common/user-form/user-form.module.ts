import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component/user-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MaterialModule } from "../../material.module";
import { TranslationModule } from "../translations-module/translation.module";

@NgModule({
  declarations: [UserFormComponent, AddUserDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    TranslationModule
  ],
  exports: [UserFormComponent, AddUserDialogComponent],
  providers: []
})
export class UserFormModule {
}
