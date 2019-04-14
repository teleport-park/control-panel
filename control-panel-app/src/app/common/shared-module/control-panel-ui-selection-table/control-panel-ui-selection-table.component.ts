import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectionTableModelItem } from './control-panel-ui-selection-table.model';
import { MatCheckboxChange, MatTableDataSource, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'control-panel-ui-selection-table',
  templateUrl: './control-panel-ui-selection-table.component.html',
  styleUrls: ['./control-panel-ui-selection-table.component.scss']
})
export class ControlPanelUiSelectionTableComponent {

  /**
   * selected
   */
  private _selected: any[] = [];

  /**
   * items
   * @param data
   */
  @Input() set items(data: SelectionTableModelItem[]) {
    if (data) {
      this.dataSource = new MatTableDataSource<SelectionTableModelItem>(data);
      if (this._selected) {
        this.setSelection();
      }
    }
  }

  /**
   * items count
   */
  @Input() length: number;

  /**
   * multiple selection flag
   */
  @Input() multipleSelection = true;

  /**
   * selected items
   * @param data
   */
  @Input() set selected(data: any[]) {
    if (data) {
      this._selected = [...data];
      this.setSelection();
    }
  }

  /**
   * displayed columns
   */
  displayedColumns: string[] = ['select', 'name'];

  /**
   * data table selection
   */
  selection: SelectionModel<SelectionTableModelItem>;

  /**
   * data source
   */
  dataSource: MatTableDataSource<SelectionTableModelItem>;

  /**
   * Emit page change
   */
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  /**
   * Emit selection change
   */
  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter();

  constructor() {
  }

  /**
   * Emit change page
   * @param event
   */
  changePage(event: PageEvent) {
    this.pageChange.emit(event);
  }

  /**
   * set selection
   */
  private setSelection() {
    if (this.dataSource && this.dataSource.data) {
      const selected = this.dataSource.data.filter(item => {
        return this._selected.findIndex(i => item.id === i.id) > -1;
      });
      this.selection = new SelectionModel<SelectionTableModelItem>(this.multipleSelection, selected);
    }
  }

  /**
   * selection change handler
   * @param event
   * @param row
   */
  selectionChangeHandler(event: MatCheckboxChange, row) {
    if (this.multipleSelection) {
      if (event.checked) {
        this._selected.push(row);
      } else {
        this._selected = this._selected.filter(item => item.id !== row.id);
      }
    } else {
      this._selected = [row];
    }
    this.selectionChange.emit(this._selected.map(item => item.id));
  }
}
