import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '../../../translations-module';
import moment, { Moment } from 'moment';
import { ExtendedFilterFieldGroup } from '../../extended-filters.component';

@Component({
  selector: 'period-field',
  templateUrl: './date-period-field.component.html',
  styleUrls: ['./date-period-field.component.scss']
})
export class DatePeriodFieldComponent implements OnInit {

  /**
   * config
   */
  config: ExtendedFilterFieldGroup;

  /**
   * form group
   */
  group: FormGroup;

  /**
   * max date
   */
  maxDate: Moment = moment();

  constructor(public translateService: TranslateService) {
  }

  ngOnInit() {
      this.group.get(this.config.group[1].property).setValue(this.maxDate, {emitEvent: false});
  }

  init() {
      this.group.get(this.config.group[1].property).setValue(this.maxDate, {emitEvent: false});
  }

}
