import { Component } from '@angular/core';
import { ExtendedFilterFieldGroup } from '../../extended-filters.component';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '../../../translations-module';

@Component({
    selector: 'radio-button-group-field',
    templateUrl: './radio-button-group-field.component.html',
    styleUrls: ['./radio-button-group-field.component.scss']
})
export class RadioButtonGroupFieldComponent {

    config: ExtendedFilterFieldGroup;

    group: FormGroup;

    constructor(public translateService: TranslateService) {
    }

    init() {

    }
}
