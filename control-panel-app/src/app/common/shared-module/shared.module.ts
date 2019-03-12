import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confitm-dialog/confirm-dialog.component';
import { TranslationModule } from "../translations-module/translation.module";
import { MaterialModule } from "../../material.module";
import { NumberDirective } from './directives/number.directive';
import { ControlPanelUiCardComponent } from './control-panel-ui-card/control-panel-ui-card.component';

@NgModule({
  declarations: [ConfirmDialogComponent, NumberDirective, ControlPanelUiCardComponent],
  imports: [
    CommonModule,
    TranslationModule,
    MaterialModule
  ],
  exports: [ConfirmDialogComponent, NumberDirective, ControlPanelUiCardComponent]
})
export class SharedModule {
}
