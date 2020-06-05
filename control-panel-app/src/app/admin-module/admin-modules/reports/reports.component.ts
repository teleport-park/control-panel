import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../common/translations-module';

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

    constructor(public translations: TranslateService) {
    }

    ngOnInit(): void {
    }

    clickHandler(event: string) {
        console.log(event);
    }
}
