import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { PeriodSelectorSubmitEvent } from '../control-panel-ui-period-selector/control-panel-ui-period-selector.component';

const moment = require('moment');

export interface TimeFilterState {
    status: { [key: string]: boolean };
    time: {f: string, t: string};
}

@Component({
    selector: 'control-panel-ui-time-filter',
    templateUrl: './control-panel-ui-time-filter.component.html',
    styleUrls: ['./control-panel-ui-time-filter.component.scss']
})
export class ControlPanelUiTimeFilterComponent implements OnInit {

    @Input() statusFilter: { statuses: string[] } = null;

    @Output() apply: EventEmitter<Partial<TimeFilterState>> = new EventEmitter();

    statusFilterState: { [key: string]: boolean } = {};

    timeFilterState = {
        lastHour: false,
        lastSixHour: false,
        lastDay: false,
        lastWeek: false,
        lastMonth: false
    };

    constructor(public translations: TranslateService) {
    }

    ngOnInit() {
        if (this.statusFilter) {
            this.statusFilter.statuses.forEach((status: string) => {
                this.statusFilterState[status] = false;
            });
        }
    }

    applyFilter(event?: PeriodSelectorSubmitEvent) {
        let time = null;
        if (event) {
            time = {
                f: event.fromMoment.toISOString(),
                t: event.toMoment.toISOString()
            };
        }
        this.apply.emit({status: this.statusFilterState, time});
    }
}
