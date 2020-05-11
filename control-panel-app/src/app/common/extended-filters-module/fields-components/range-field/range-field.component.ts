import { Component, OnInit } from '@angular/core';
import { ExtendedFilterFieldGroup } from '../../extended-filters.component';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '../../../translations-module';

@Component({
  selector: 'range-field',
  templateUrl: './range-field.component.html',
  styleUrls: ['./range-field.component.scss']
})
export class RangeFieldComponent implements OnInit {

  config: ExtendedFilterFieldGroup;

  group: FormGroup;

  range: number[] = [];

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    for (let i = this.config.from; i <= this.config.to; i++) {
      this.range.push(i);
    }
  }

  checkMax() {
      if (this.config.group[1].validators && this.config.group[1].validators.length) {
          return (this.config.group[1].validators.find(i => i.key === 'max') || {value: null}).value;
      }
      return null;
  }

  checkMin() {
      if (this.config.group[0].validators && this.config.group[0].validators.length) {
          return (this.config.group[0].validators.find(i => i.key === 'min') || {value: null}).value;
      }
      return null;
  }
}
