import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../common/translations-module';
import { ReportsService } from '../reports.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    title: string = '';

    type: string;

    constructor(public translations: TranslateService, public service: ReportsService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.type = this.activatedRoute.snapshot.params?.reportType;
        this.title = this.service.reportTypes.find(type => type.value === this.type)?.title;
    }
}
