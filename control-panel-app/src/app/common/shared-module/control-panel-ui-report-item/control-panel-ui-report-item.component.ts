import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'control-panel-ui-report-item',
    templateUrl: './control-panel-ui-report-item.component.html',
    styleUrls: ['./control-panel-ui-report-item.component.scss']
})
export class ControlPanelUiReportItemComponent {

    @Input() title: string;

    @Input() type: string;

    @Output() typeSelect: EventEmitter<any> = new EventEmitter();

    @HostListener('click', ['$event'])
    clickHandler(event) {
        this.type && this.typeSelect.emit(this.type);
    }

    constructor() {
    }

}
