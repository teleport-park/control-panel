import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PromoService } from './services/promo.service';
import { TranslateService } from '../../../../common/translations-module';
import { FormControl } from '@angular/forms';
import { CronOptions } from '../../../../common/control-panel-cron-generator/CronOptions';
import { MatTableDataSource } from '@angular/material';
import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';

const cloneDeep = require('lodash.clonedeep');

@Component({
    selector: 'promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss'],
    providers: [PromoService]
})
export class PromoComponent implements OnInit {

    cronOptions: CronOptions = {
        defaultTime: '00:00:00',
        hideMinutesTab: true,
        hideHourlyTab: true,
        hideDailyTab: false,
        hideWeeklyTab: false,
        hideMonthlyTab: false,
        hideYearlyTab: true,
        hideAdvancedTab: true,
        hideSpecificWeekDayTab : false,
        hideSpecificMonthWeekTab : false,
        use24HourTime: true,
        hideSeconds: false,
        cronFlavor: 'standard' // standard or quartz
    };

    cronControl: FormControl;

    displayedColumns: string[] = ['order', 'display_name', 'packages', 'active', 'archived', 'enabled'];

    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    constructor(public service: PromoService, public translationService: TranslateService, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.service.promo$.subscribe(
            res => {
                this.dataSource.data = res;
            }
        );
        this.service.getPromo();
        this.cronControl = new FormControl('0 0 1/1 * *');
    }

    onListDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.dataSource.data = cloneDeep(this.dataSource.data);
        setTimeout(() => {
            this.dataSource.data[event.currentIndex].moved = true;
            this.dataSource.data[event.previousIndex].movedFrom = true;
            this.cd.markForCheck();
            setTimeout(() => {
                this.reset();
            }, 100);
        }, 1);

    }

    reset(e?: CdkDragStart, index?: number) {
        this.dataSource.data.forEach(i => {
           delete i.moved;
           delete i.movedFrom;
        });
        this.cd.markForCheck();
    }
}
