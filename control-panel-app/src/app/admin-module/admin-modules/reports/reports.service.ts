import { Injectable } from '@angular/core';

interface ReportType {
    value: string;
    title: string;
    icon: string;
}

@Injectable()

export class ReportsService {
    public reportTypes: ReportType[] = [
        {value: 'coins', icon: 'monetization_on', title: 'REPORT_COINS'},
        {value: 'times', icon: 'access_time', title: 'REPORT_TIMES'},
        {value: 'starts', icon: 'outlined_flag', title: 'REPORT_STARTS'},
        {value: 'bills', icon: 'list_alt', title: 'REPORT_BILLS'}
    ];
    constructor() {
    }
}
