import { Component, Input } from '@angular/core';

@Component({
    selector: 'control-panel-ui-card',
    templateUrl: './control-panel-ui-card.component.html',
    styleUrls: ['./control-panel-ui-card.component.scss']

})
export class ControlPanelUiCardComponent {

    @Input() hideHeader: boolean;

    constructor() {
    }
}
