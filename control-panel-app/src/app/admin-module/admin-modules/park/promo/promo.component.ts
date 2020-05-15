import { Component, OnInit } from '@angular/core';
import { PromoService } from './services/promo.service';
import { TranslateService } from '../../../../common/translations-module';
import { FormControl } from '@angular/forms';
import { CronOptions } from '../../../../common/control-panel-cron-generator/CronOptions';

@Component({
    selector: 'promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss'],
    providers: [PromoService]
})
export class PromoComponent implements OnInit {

    cronOptions: CronOptions = {

        defaultTime: '00:00:00',

        hideMinutesTab: false,
        hideHourlyTab: false,
        hideDailyTab: false,
        hideWeeklyTab: false,
        hideMonthlyTab: false,
        hideYearlyTab: false,
        hideAdvancedTab: true,
        hideSpecificWeekDayTab : false,
        hideSpecificMonthWeekTab : false,

        use24HourTime: true,
        hideSeconds: false,

        cronFlavor: 'standard' // standard or quartz
    };

    cronControl: FormControl;

    displayedColumns: string[] = ['display_name', 'packages', 'archived', 'enabled'];

    constructor(public service: PromoService, public translationService: TranslateService) {
    }

    ngOnInit() {
        this.service.getPromo();
        this.cronControl = new FormControl('0 0 1/1 * *');
    }

}
