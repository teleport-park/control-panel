import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'control-panel-ui-report-item',
    templateUrl: './control-panel-ui-report-item.component.html',
    styleUrls: ['./control-panel-ui-report-item.component.scss']
})
export class ControlPanelUiReportItemComponent {

    @Input() title: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @HostListener('click', ['$event'])
    clickHandler(event) {
        this.onClick.emit(this.title);
    }

    constructor() {
    }

}
