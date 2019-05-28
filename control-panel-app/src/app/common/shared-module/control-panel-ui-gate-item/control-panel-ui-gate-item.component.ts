import { Component, Input, OnInit } from '@angular/core';
import { GateController } from '../../../models';

@Component({
  selector: 'control-panel-ui-gate-item',
  templateUrl: './control-panel-ui-gate-item.component.html',
  styleUrls: ['./control-panel-ui-gate-item.component.scss']
})
export class ControlPanelUiGateItemComponent implements OnInit {

  @Input() item: GateController;

  constructor() {
  }

  ngOnInit() {
  }

}
