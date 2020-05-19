import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '../../../translations-module';
import { ExtendedFilterFieldGroup } from '../../extended-filters.component';

@Component({
  selector: 'select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {

  config: ExtendedFilterFieldGroup;

  group: FormGroup;

  constructor(public translations: TranslateService) {
  }

  ngOnInit() {
  }

}
