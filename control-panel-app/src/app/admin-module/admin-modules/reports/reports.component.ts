import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../common/translations-module';
import { Router } from '@angular/router';
import { ReportsService } from './reports.service';

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

    constructor(public translations: TranslateService,
                public service: ReportsService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    clickHandler(type: string) {
        this.router.navigate(['admin', 'reports', type]);
    }
}
