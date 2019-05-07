import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedFiltersComponent } from './extended-filters.component';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectFieldComponent } from './fields-components/select-field/select-field.component';
import { ExtendedFiltersDirective } from './extended-filters.directive';
import { DatePeriodFieldComponent } from './fields-components/date-period-field/date-period-field.component';
import { CheckBoxGroupFieldComponent } from './fields-components/check-box-group-field/check-box-group-field.component';
import { RangeFieldComponent } from './fields-components/range-field/range-field.component';

@NgModule({
  declarations: [
    ExtendedFiltersComponent,
    SelectFieldComponent,
    ExtendedFiltersDirective,
    DatePeriodFieldComponent,
    CheckBoxGroupFieldComponent,
    RangeFieldComponent],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [ExtendedFiltersComponent, ExtendedFiltersDirective],
  entryComponents: [SelectFieldComponent, DatePeriodFieldComponent, CheckBoxGroupFieldComponent, RangeFieldComponent]
})
export class ExtendedFiltersModule {
}
