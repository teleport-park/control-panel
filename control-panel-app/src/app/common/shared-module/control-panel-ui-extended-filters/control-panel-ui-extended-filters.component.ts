import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'control-panel-ui-extended-filters',
  templateUrl: './control-panel-ui-extended-filters.component.html',
  styleUrls: ['./control-panel-ui-extended-filters.component.scss']
})
export class ControlPanelUiExtendedFiltersComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
