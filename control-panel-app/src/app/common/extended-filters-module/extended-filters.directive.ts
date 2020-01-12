import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { SelectFieldComponent } from './fields-components/select-field/select-field.component';
import { DatePeriodFieldComponent } from './fields-components/date-period-field/date-period-field.component';
import { CheckBoxGroupFieldComponent } from './fields-components/check-box-group-field/check-box-group-field.component';
import { RangeFieldComponent } from './fields-components/range-field/range-field.component';
import { RadioButtonGroupFieldComponent } from './fields-components/radio-button-group-field/radio-button-group-field.component';

const components = {
   select: SelectFieldComponent,
   'date-period': DatePeriodFieldComponent,
   'check-box-group': CheckBoxGroupFieldComponent,
   'radio-button-group': RadioButtonGroupFieldComponent,
   range: RangeFieldComponent
};

@Directive({
   selector: '[extendedFilters]'
})
export class ExtendedFiltersDirective implements OnInit {
   @Input() config;

   @Input() group;

   component;

   constructor(private resolver: ComponentFactoryResolver,
               private container: ViewContainerRef) {
   }

   ngOnInit(): void {
      const component = components[this.config.type];
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory);
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
   }
}
