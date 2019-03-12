import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'control-panel-ui-card',
  templateUrl: './control-panel-ui-card.component.html',
  styleUrls: ['./control-panel-ui-card.component.scss']
})
export class ControlPanelUiCardComponent {

  // @Input() panelUIColor: 'primary' | 'green' | 'blue' | 'red' | 'orange' = 'primary';

  @HostBinding('class') @Input() panelUIColor: 'primary' | 'green' | 'blue' | 'red' | 'orange' = 'primary';

  constructor() {
  }
}
