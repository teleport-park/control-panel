import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { TranslationModule } from '../translations-module/translation.module';
import { MaterialModule } from '../../material.module';
import {
    AlphanumericLatinDirective,
    AmountFormatDirective,
    Hex4ByteDirective,
    NumberDirective
} from './directives/number.directive';
import { ControlPanelUiCardComponent } from './control-panel-ui-card/control-panel-ui-card.component';
import { ControlPanelUiTableComponent } from './control-panel-ui-table/control-panel-ui-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlPanelUiActionToolbarComponent } from './control-panel-ui-action-toolbar/control-panel-ui-action-toolbar.component';
import { ControlPanelUiWidgetComponent } from './control-panel-ui-widget/control-panel-ui-widget.component';
import { ControlPanelUiSelectionTableComponent } from './control-panel-ui-selection-table/control-panel-ui-selection-table.component';
import { AddStaffDialogComponent } from './dialogs/add-staff-dialog/add-staff-dialog.component';
import { ChartistModule } from 'ng-chartist';
import { ControlPanelUiImagePreviewComponent } from './control-panel-ui-image-preview/control-panel-ui-image-preview.component';
import { ControlPanelTriggerComponent } from './control-panel-trigger/control-panel-trigger.component';
import { ControlPanelUiQuickFilterComponent } from './control-panel-ui-quick-filter/control-panel-ui-quick-filter.component';
import { ControlPanelUiTimeFilterComponent } from './control-panel-ui-time-filter/control-panel-ui-time-filter.component';
import { ControlPanelUiPeriodSelectorComponent } from './control-panel-ui-period-selector/control-panel-ui-period-selector.component';
import { MatRippleModule } from '@angular/material/core';
import { BoundCardDialogComponent } from './dialogs/bound-card-dialog/bound-card-dialog.component';
import { ControlPanelUiTimeSliderComponent } from './control-panel-ui-time-slider/control-panel-ui-time-slider.component';
import { ControlPanelGamesListComponent } from './control-panel-games-list/control-panel-games-list.component';
import { ControlPanelUiItemCardComponent } from './control-panel-ui-item-card/control-panel-ui-item-card.component';
import { ControlPanelUiEmptyComponent } from './control-panel-ui-empty/control-panel-ui-empty.component';
import { ControlPanelUiReportItemComponent } from './control-panel-ui-report-item/control-panel-ui-report-item.component';
import { MockComponent } from './mock/mock.component';

const MODULES = [
  ConfirmDialogComponent,
  BoundCardDialogComponent,
  NumberDirective,
  AmountFormatDirective,
  AlphanumericLatinDirective,
  Hex4ByteDirective,
  ControlPanelUiCardComponent,
  ControlPanelUiTableComponent,
  ControlPanelUiActionToolbarComponent,
  ControlPanelUiWidgetComponent,
  ControlPanelUiSelectionTableComponent,
  AddStaffDialogComponent,
  ControlPanelUiImagePreviewComponent,
  ControlPanelTriggerComponent,
  ControlPanelUiQuickFilterComponent,
  ControlPanelUiTimeFilterComponent,
  ControlPanelUiPeriodSelectorComponent,
  ControlPanelUiTimeSliderComponent,
  ControlPanelGamesListComponent,
  ControlPanelUiItemCardComponent,
  ControlPanelUiEmptyComponent,
  ControlPanelUiReportItemComponent,
  MockComponent
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
