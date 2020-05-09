import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ControllerType } from '../../../models/types';

@Component({
    selector: 'control-panel-ui-item-card',
    templateUrl: './control-panel-ui-item-card.component.html',
    styleUrls: ['./control-panel-ui-item-card.component.scss']
})
export class ControlPanelUiItemCardComponent implements OnInit {

    /**
     * items
     */
    @Input() item: ControllerType;

    constructor() {
    }

    ngOnInit() {
    }

}
