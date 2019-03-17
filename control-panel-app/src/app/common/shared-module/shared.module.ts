import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TranslationModule } from "../translations-module/translation.module";
import { MaterialModule } from "../../material.module";
import { NumberDirective } from './directives/number.directive';
import { ControlPanelUiCardComponent } from './control-panel-ui-card/control-panel-ui-card.component';
import { ControlPanelUiExtendedFiltersComponent } from './control-panel-ui-extended-filters/control-panel-ui-extended-filters.component';
import { ControlPanelUiTableComponent } from './control-panel-ui-table/control-panel-ui-table.component';

@NgModule({
  declarations: [ConfirmDialogComponent, NumberDirective, ControlPanelUiCardComponent, ControlPanelUiExtendedFiltersComponent, ControlPanelUiTableComponent],
  imports: [
    CommonModule,
    TranslationModule,
    MaterialModule
  ],
  exports: [ConfirmDialogComponent, NumberDirective, ControlPanelUiCardComponent, ControlPanelUiExtendedFiltersComponent, ControlPanelUiTableComponent]
})
export class SharedModule {
}
