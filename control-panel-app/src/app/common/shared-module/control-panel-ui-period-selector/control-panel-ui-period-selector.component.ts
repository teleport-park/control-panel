import { Component, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { TranslateService } from '../../translations-module';

const moment = require('moment');

export interface PeriodSelectorSubmitEvent {
    from: string;
    to: string;
    fromMoment: Moment;
    toMoment: Moment;
}

@Component({
    selector: 'control-panel-ui-period-selector',
    templateUrl: './control-panel-ui-period-selector.component.html',
    styleUrls: ['./control-panel-ui-period-selector.component.scss']
})
export class ControlPanelUiPeriodSelectorComponent {

    @ViewChildren('fast_link') linkList: QueryList<ElementRef>;

    timeStamp = moment();

    /**
     * from input label
     */
    @Input() fromLabel = 'From';

    /**
     * to input label
     */
    @Input() toLabel = 'To';

    /**
     * select period button label
     */
    @Input() submitLabel = 'Select period';

    /**
     * format for date, see https://momentjs.com/docs/#/displaying/format/
     */
    @Input() format = 'DD.MM.YYYY';

    /**
     * max date value
     */
    @Input() maxDate: Moment = this.timeStamp;

    @Input() minDate: Moment;

    /**
     * output event
     * @return PeriodSelectorSubmitEvent
     */
    @Output() selectPeriod: EventEmitter<PeriodSelectorSubmitEvent> = new EventEmitter();

    /**
     * from date form control
     */
    _fromDateControl = new FormControl(null);
    /**
     * from date form control
     */
    _fromTimeControl = new FormControl(null);

    /**
     * to date form control
     */
    _toDateControl = new FormControl(this.maxDate);
    /**
     * to date form control
     */
    _toTimeControl = new FormControl(this.timeStamp.format('HH:mm'));


    constructor(private renderer: Renderer2, public translations: TranslateService) {
    }

    public setPeriod(unit: string, value: number, index: number) {
        this.linkList.forEach(link => {
            this.renderer.removeClass(link.nativeElement, 'active');
        });
        this.renderer.addClass(this.linkList.toArray()[index].nativeElement, 'active');
        this.timeStamp = moment();
        const fromDate = moment().subtract(value, unit);
        this._fromTimeControl.setValue(fromDate.format('HH:mm'));
        this._fromDateControl.setValue(fromDate);
    }

    /**
     * submit handler
     */
    submit() {
        if (this.validateControl(this._fromDateControl) && this.validateControl(this._toDateControl)) {
            this.selectPeriod.emit(this.preparePeriod());
            return;
        }
        this._fromDateControl.markAsTouched();
        this._toDateControl.markAsTouched();
    }

    /**
     * validate control
     * @param control
     */
    private validateControl(control: FormControl): boolean {
        return !!control.value && !control.errors;
    }

    /**
     * prepare event<PeriodSelectorSubmitEvent>
     */
    private preparePeriod(): PeriodSelectorSubmitEvent {
        const from = this._fromDateControl.value as Moment;
        const to = this._toDateControl.value as Moment;
        from.set({
            hour: this._fromTimeControl.value.split(':')[0],
            minute: this._fromTimeControl.value.split(':')[1]
        });
        to.set({
            hour: this._toTimeControl.value.split(':')[0],
            minute: this._toTimeControl.value.split(':')[1]
        });

        return {
            from: moment(this._fromDateControl.value).format(this.format),
            to: moment(this._toDateControl).format(this.format),
            fromMoment: from,
            toMoment: to
        };
    }

    reset() {
        this.linkList.forEach(link => {
            this.renderer.removeClass(link.nativeElement, 'active');
        });
        this._fromTimeControl.setValue(null);
        this._fromDateControl.setValue(null);
        this.timeStamp = moment();
        this._toTimeControl.setValue(this.timeStamp.format('HH:mm'));
        this._toDateControl.setValue(this.timeStamp);
        this.selectPeriod.emit(null);
    }

}
