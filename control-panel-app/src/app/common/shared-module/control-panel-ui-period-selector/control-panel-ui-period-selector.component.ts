import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Moment } from 'moment';
import { FormControl, Validators } from '@angular/forms';

const moment = require('moment');

export interface PeriodSelectorSubmitEvent {
   from: string;
   to: string;
   fromMoment: Moment;
   toMoment: Moment;
}

@Component({
  selector: 'control-panel-ui-period-selector',
  templateUrl: './control-panel-ui-period-selector.component.html',
  styleUrls: ['./control-panel-ui-period-selector.component.scss']
})
export class ControlPanelUiPeriodSelectorComponent {

   /**
    * from input label
    */
   @Input() fromLabel = 'From';

   /**
    * to input label
    */
   @Input() toLabel = 'To';

   /**
    * select period button label
    */
   @Input() submitLabel = 'Select period';

   /**
    * format for date, see https://momentjs.com/docs/#/displaying/format/
    */
   @Input() format = 'DD.MM.YYYY';

   /**
    * max date value
    */
   @Input() maxDate: Moment = moment();

   @Input() minDate: Moment;

   /**
    * output event
    * @return PeriodSelectorSubmitEvent
    */
   @Output() selectPeriod: EventEmitter<PeriodSelectorSubmitEvent> = new EventEmitter();

   /**
    * from date form control
    */
   _fromControl = new FormControl(null, [Validators.required]);

   /**
    * to date form control
    */
   _toControl = new FormControl(this.maxDate, [Validators.required]);


   constructor() {
   }

   /**
    * submit handler
    */
   submit() {
      if (this.validateControl(this._fromControl) && this.validateControl(this._toControl)) {
         this.selectPeriod.emit(this.preparePeriod());
         return;
      }
      this._fromControl.markAsTouched();
      this._toControl.markAsTouched();
   }

   /**
    * validate control
    * @param control
    */
   private validateControl(control: FormControl): boolean {
      return !!control.value && !control.errors;
   }

   /**
    * prepare event<PeriodSelectorSubmitEvent>
    */
   private preparePeriod(): PeriodSelectorSubmitEvent {
      return {
         from: moment(this._fromControl.value).format(this.format),
         to: moment(this._toControl).format(this.format),
         fromMoment: this._fromControl.value,
         toMoment: this._toControl.value
      };
   }

}
