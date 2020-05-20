import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';
import { debounceTime, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'control-panel-ui-time-slider',
    templateUrl: './control-panel-ui-time-slider.component.html',
    styleUrls: ['./control-panel-ui-time-slider.component.scss']
})
export class ControlPanelUiTimeSliderComponent implements OnInit, AfterViewInit {

    @ViewChild('slider') slider: MatSlider;

    @Output() sliderChange: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.slider && this.slider.change.pipe(
            debounceTime(500),
            switchMap(res => {
                this.sliderChange.emit(this.format(res.value));
                return EMPTY;
            })
        ).subscribe();
    }

    format(value: number) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2);
    }

}
