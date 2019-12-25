import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'control-panel-ui-time-filter',
  templateUrl: './control-panel-ui-time-filter.component.html',
  styleUrls: ['./control-panel-ui-time-filter.component.scss']
})
export class ControlPanelUiTimeFilterComponent implements OnInit {

   @Input() statusFilter: {statuses: string[]} = null;

  constructor() { }

  ngOnInit() {
  }

}
