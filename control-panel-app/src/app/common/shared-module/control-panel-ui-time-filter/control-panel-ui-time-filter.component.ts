import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TimeFilterState {
   status: {[key: string]: boolean};
}

@Component({
   selector: 'control-panel-ui-time-filter',
   templateUrl: './control-panel-ui-time-filter.component.html',
   styleUrls: ['./control-panel-ui-time-filter.component.scss']
})
export class ControlPanelUiTimeFilterComponent implements OnInit {

   @Input() statusFilter: { statuses: string[] } = null;

   @Output() apply: EventEmitter<TimeFilterState> = new EventEmitter();

   statusFilterState: { [key: string]: boolean } = {};

   constructor() {
   }

   ngOnInit() {
      this.statusFilter.statuses.forEach((status: string) => {
        this.statusFilterState[status] = false;
      });
   }

   applyFilter() {
      this.apply.emit({status: this.statusFilterState});
   }

}
