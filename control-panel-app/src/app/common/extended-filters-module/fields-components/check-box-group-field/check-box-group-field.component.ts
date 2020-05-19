import { Component } from '@angular/core';
import { TranslateService } from '../../../translations-module';
import { FormGroup } from '@angular/forms';
import { ExtendedFilterFieldGroup } from '../../extended-filters.component';

@Component({
    selector: 'check-box-group-field',
    templateUrl: './check-box-group-field.component.html',
    styleUrls: ['./check-box-group-field.component.scss']
})
export class CheckBoxGroupFieldComponent {

    config: ExtendedFilterFieldGroup;

    group: FormGroup;

    constructor(public translations: TranslateService) {
    }

    init() {

    }
}
