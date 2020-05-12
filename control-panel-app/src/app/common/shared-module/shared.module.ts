import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { TranslationModule } from '../translations-module/translation.module';
import { MaterialModule } from '../../material.module';
import { AmountFormatDirective, NumberDirective } from './directives/number.directive';
import { ControlPanelUiCardComponent } from './control-panel-ui-card/control-panel-ui-card.component';
import { ControlPanelUiTableComponent } from './control-panel-ui-table/control-panel-ui-table.component';
import { ControlPanelUiSelectionComponent } from './control-panel-ui-selection/control-panel-ui-selection.component';
import { AddGroupDialogComponent } from './dialogs/add-group-dalog/add-group-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSimpleEntityDialogComponent } from './dialogs/add-simple-entity-dialog/add-simple-entity-dialog.component';
import { ControlPanelUiActionToolbarComponent } from './control-panel-ui-action-toolbar/control-panel-ui-action-toolbar.component';
import { ControlPanelUiWidgetComponent } from './control-panel-ui-widget/control-panel-ui-widget.component';
import { ControlPanelUiSelectionTableComponent } from './control-panel-ui-selection-table/control-panel-ui-selection-table.component';
import { AddStaffDialogComponent } from './dialogs/add-staff-dialog/add-staff-dialog.component';
import { ChartistModule } from 'ng-chartist';
import { ControlPanelUiImagePreviewComponent } from './control-panel-ui-image-preview/control-panel-ui-image-preview.component';
import { AddControllerDialogComponent } from './dialogs/add-controller-dialog/add-controller-dialog.component';
import { ControlPanelTriggerComponent } from './control-panel-trigger/control-panel-trigger.component';
import { ControlPanelUiQuickFilterComponent } from './control-panel-ui-quick-filter/control-panel-ui-quick-filter.component';
import { ControlPanelUiTimeFilterComponent } from './control-panel-ui-time-filter/control-panel-ui-time-filter.component';
import { ControlPanelUiPeriodSelectorComponent } from './control-panel-ui-period-selector/control-panel-ui-period-selector.component';
import { MatRippleModule } from '@angular/material';
import { BoundCardDialogComponent } from './dialogs/bound-card-dialog/bound-card-dialog.component';
import { ControlPanelUiTimeSliderComponent } from './control-panel-ui-time-slider/control-panel-ui-time-slider.component';
import { ControlPanelGamesListComponent } from './control-panel-games-list/control-panel-games-list.component';
import { ControlPanelUiItemCardComponent } from './control-panel-ui-item-card/control-panel-ui-item-card.component';
import { ControlPanelUiEmptyComponent } from './control-panel-ui-empty/control-panel-ui-empty.component';
import { ControlPanelUiTariffTreeComponent } from './control-panel-ui-tariff-tree/control-panel-ui-tariff-tree.component';
import { ControlPanelUiPackageComponent } from './control-panel-ui-package/control-panel-ui-package.component';
import { ControlPanelUiPaymentComponent } from './control-panel-ui-payment/control-panel-ui-payment.component';

const MODULES = [
    ConfirmDialogComponent,
    BoundCardDialogComponent,
    NumberDirective,
    AmountFormatDirective,
    ControlPanelUiCardComponent,
    ControlPanelUiTableComponent,
    ControlPanelUiSelectionComponent,
    AddGroupDialogComponent,
    AddSimpleEntityDialogComponent,
    ControlPanelUiActionToolbarComponent,
    ControlPanelUiWidgetComponent,
    ControlPanelUiSelectionTableComponent,
    AddStaffDialogComponent,
    ControlPanelUiImagePreviewComponent,
    AddControllerDialogComponent,
    ControlPanelTriggerComponent,
    ControlPanelUiQuickFilterComponent,
    ControlPanelUiTimeFilterComponent,
    ControlPanelUiPeriodSelectorComponent,
    ControlPanelUiTimeSliderComponent,
    ControlPanelGamesListComponent,
    ControlPanelUiItemCardComponent,
    ControlPanelUiEmptyComponent,
    ControlPanelUiTariffTreeComponent,
    ControlPanelUiPackageComponent,
    ControlPanelUiPaymentComponent,
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
        ChartistModule,
        MatRippleModule
    ],
    entryComponents: [ConfirmDialogComponent, BoundCardDialogComponent]
})
export class SharedModule {
}
