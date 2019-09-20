import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { TranslationModule } from '../translations-module/translation.module';
import { MaterialModule } from '../../material.module';
import { NumberDirective } from './directives/number.directive';
import { ControlPanelUiCardComponent } from './control-panel-ui-card/control-panel-ui-card.component';
import { ControlPanelUiTableComponent } from './control-panel-ui-table/control-panel-ui-table.component';
import { ControlPanelUiSelectionComponent } from './control-panel-ui-selection/control-panel-ui-selection.component';
import { AddOrEditEntityDialogComponent } from './dialogs/add-entity-dialog/add-or-edit-entity-dialog.component';
import { AddGroupDialogComponent } from './dialogs/add-group-dalog/add-group-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
import { AddSimpleEntityDialogComponent } from './dialogs/add-simple-entity-dialog/add-simple-entity-dialog.component';
import { ControlPanelUiActionToolbarComponent } from './control-panel-ui-action-toolbar/control-panel-ui-action-toolbar.component';
import { ControlPanelUiWidgetComponent } from './control-panel-ui-widget/control-panel-ui-widget.component';
import { ControlPanelUiSelectionTableComponent } from './control-panel-ui-selection-table/control-panel-ui-selection-table.component';
import { AddStaffDialogComponent } from './dialogs/add-staff-dialog/add-staff-dialog.component';
import { ControlPanelUiHardwareItemComponent } from './control-panel-ui-hardware-item/control-panel-ui-hardware-item.component';
import { ChartistModule } from 'ng-chartist';
import { ControlPanelUiImagePreviewComponent } from './control-panel-ui-image-preview/control-panel-ui-image-preview.component';
import { ControlPanelUiTariffTreeComponent } from './control-panel-ui-tariff-tree/control-panel-ui-tariff-tree.component';
import { ControlPanelUiPackageComponent } from './control-panel-ui-package/control-panel-ui-package.component';
import { ControlPanelUiPaymentComponent } from './control-panel-ui-payment/control-panel-ui-payment.component';
import { AddControllerDialogComponent } from './dialogs/add-controller-dialog/add-controller-dialog.component';
import { ControlPanelUiLinearGraphComponent } from './control-panel-ui-linear-graph/control-panel-ui-linear-graph.component';
import { ControlPanelUiGateItemComponent } from './control-panel-ui-gate-item/control-panel-ui-gate-item.component';
import { ControlPanelTriggerComponent } from './control-panel-trigger/control-panel-trigger.component';

const MODULES = [
  ConfirmDialogComponent,
  NumberDirective,
  ControlPanelUiCardComponent,
  ControlPanelUiTableComponent,
  ControlPanelUiSelectionComponent,
  AddOrEditEntityDialogComponent,
  AddGroupDialogComponent,
  AddSimpleEntityDialogComponent,
  ControlPanelUiActionToolbarComponent,
  ControlPanelUiWidgetComponent,
  ControlPanelUiSelectionTableComponent,
  AddStaffDialogComponent,
  ControlPanelUiHardwareItemComponent,
  ControlPanelUiImagePreviewComponent,
  ControlPanelUiTariffTreeComponent,
  ControlPanelUiPackageComponent,
  ControlPanelUiPaymentComponent,
  AddControllerDialogComponent,
  ControlPanelUiLinearGraphComponent,
  ControlPanelUiGateItemComponent,
  ControlPanelTriggerComponent
];

@NgModule({
  declarations: [...MODULES],
  exports: [...MODULES],
  imports: [
    CommonModule,
    TranslationModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FormModule,
    ChartistModule
  ]
})
export class SharedModule {
}
