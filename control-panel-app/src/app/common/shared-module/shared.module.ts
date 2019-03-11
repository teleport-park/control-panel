import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confitm-dialog/confirm-dialog.component';
import { TranslationModule } from "../translations-module/translation.module";
import { MaterialModule } from "../../material.module";
import { NumberDirective } from './directives/number.directive';

@NgModule({
  declarations: [ConfirmDialogComponent, NumberDirective],
  imports: [
    CommonModule,
    TranslationModule,
    MaterialModule
  ],
  exports: [ConfirmDialogComponent, NumberDirective]
})
export class SharedModule { }
