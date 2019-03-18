import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TranslationModule } from "../translations-module/translation.module";
import { MaterialModule } from "../../material.module";
import { NumberDirective } from './directives/number.directive';
import { ControlPanelUiCardComponent } from './control-panel-ui-card/control-panel-ui-card.component';
import { ControlPanelUiExtendedFiltersComponent } from './control-panel-ui-extended-filters/control-panel-ui-extended-filters.component';
import { ControlPanelUiTableComponent } from './control-panel-ui-table/control-panel-ui-table.component';
import { ControlPanelUiSelectionComponent } from './control-panel-ui-selection/control-panel-ui-selection.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NumberDirective,
    ControlPanelUiCardComponent,
    ControlPanelUiExtendedFiltersComponent,
    ControlPanelUiTableComponent,
    ControlPanelUiSelectionComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    MaterialModule
  ],
  exports: [
    ConfirmDialogComponent,
    NumberDirective,
    ControlPanelUiCardComponent,
    ControlPanelUiExtendedFiltersComponent,
    ControlPanelUiTableComponent,
    ControlPanelUiSelectionComponent
  ]
})
export class SharedModule {
}
