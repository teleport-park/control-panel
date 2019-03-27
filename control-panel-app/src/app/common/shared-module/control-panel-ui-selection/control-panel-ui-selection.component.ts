import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';


@Component({
  selector: 'control-panel-ui-selection',
  templateUrl: './control-panel-ui-selection.component.html',
  styleUrls: ['./control-panel-ui-selection.component.scss']
})
export class ControlPanelUiSelectionComponent implements OnInit {

  /**
   * value map
   */
  @Input() valuesMap;

  /**
   * init selected value
   */
  @Input() selected: any[] = [];

  /**
   * on selection change event
   */
  @Output() selectionChange: EventEmitter<string[]> = new EventEmitter();

  /**
   * selection
   */
  _selection: Set<string> = new Set();

  constructor() { }

  ngOnInit() {
    this.selected.map(item => {
      this._selection.add(item.id);
    });
  }

  /**
   * change handler
   * @param event
   * @param value
   */
  changeHandler(event: MatCheckboxChange, value: string): void {
    if (event.checked) {
      this._selection.add(value);
    } else {
      this._selection.delete(value);
    }
    this.selectionChange.emit(Array.from(this._selection));
  }

  /**
   * is selected
   * @param value
   */
  isSelected(value: any): boolean {
    return this._selection.has(value);
  }
}
