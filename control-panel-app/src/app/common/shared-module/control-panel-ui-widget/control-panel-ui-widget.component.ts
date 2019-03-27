import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'control-panel-ui-widget',
  templateUrl: './control-panel-ui-widget.component.html',
  styleUrls: ['./control-panel-ui-widget.component.scss']
})
export class ControlPanelUiWidgetComponent implements OnInit {

  @HostBinding('class') @Input() panelUIColor: 'primary' | 'green' | 'blue' | 'red' | 'orange' = 'primary';

  constructor() { }

  ngOnInit() {
  }

}
