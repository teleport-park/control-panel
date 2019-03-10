import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confitm-dialog/confirm-dialog.component';
import { TranslationModule } from "../translations-module/translation.module";
import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    TranslationModule,
    MaterialModule
  ],
  exports: [ConfirmDialogComponent]
})
export class SharedModule { }
