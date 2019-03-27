import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { TranslationModule } from '../translations-module/translation.module';
import { MaterialModule } from '../../material.module';
import { NumberDirective } from './directives/number.directive';
import { ControlPanelUiCardComponent } from './control-panel-ui-card/control-panel-ui-card.component';
import { ControlPanelUiExtendedFiltersComponent } from './control-panel-ui-extended-filters/control-panel-ui-extended-filters.component';
import { ControlPanelUiTableComponent } from './control-panel-ui-table/control-panel-ui-table.component';
import { ControlPanelUiSelectionComponent } from './control-panel-ui-selection/control-panel-ui-selection.component';
import { AddOrEditEntityDialogComponent } from './dialogs/add-entity-dialog/add-or-edit-entity-dialog.component';
import { AddGroupDialogComponent } from './dialogs/add-group-dalog/add-group-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
import { AddSimpleEntityDialogComponent } from './dialogs/add-simple-entity-dialog/add-simple-entity-dialog.component';
import { ControlPanelUiActionToolbarComponent } from './control-panel-ui-action-toolbar/control-panel-ui-action-toolbar.component';
import { ControlPanelUiWidgetComponent } from './control-panel-ui-widget/control-panel-ui-widget.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NumberDirective,
    ControlPanelUiCardComponent,
    ControlPanelUiExtendedFiltersComponent,
    ControlPanelUiTableComponent,
    ControlPanelUiSelectionComponent,
    AddOrEditEntityDialogComponent,
    AddGroupDialogComponent,
    AddSimpleEntityDialogComponent,
    ControlPanelUiActionToolbarComponent,
    ControlPanelUiWidgetComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FormModule
  ],
  exports: [
    ConfirmDialogComponent,
    NumberDirective,
    ControlPanelUiCardComponent,
    ControlPanelUiExtendedFiltersComponent,
    ControlPanelUiTableComponent,
    ControlPanelUiSelectionComponent,
    AddOrEditEntityDialogComponent,
    AddGroupDialogComponent,
    ControlPanelUiActionToolbarComponent,
    ControlPanelUiWidgetComponent
  ]
})
export class SharedModule {
}
