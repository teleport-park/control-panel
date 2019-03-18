import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from "../../translations-module";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { StaffMember } from "../../../models";
import { SelectionModel } from "@angular/cdk/collections";
import { BreakpointService } from "../../../services/breakpoint.service";
import { PropertyMap } from "../../../admin-module/utils/property-map";
import { PermissionValuesMap } from "../../../admin-module/utils/permission-values-map";

@Component({
  selector: 'control-panel-ui-table',
  templateUrl: './control-panel-ui-table.component.html',
  styleUrls: ['./control-panel-ui-table.component.scss']
})
export class ControlPanelUiTableComponent implements OnInit {

  valueMap = PermissionValuesMap;

  /**
   * property translations map
   */
  propertyMap = PropertyMap;

  _data: any[];

  @Input() displayedColumns: string[] = [];

  @Input() simpleDataColumn: string[] = [];

  @Input() listSortedColumn: string[] = [];

  /**
   * data source for table
   */
  @Input() set data(data: any) {
    if (data) {
      this._data = data;
      this.initDataSource();
    }
  };

  /**
   * data source for table
   */
  public dataSource: MatTableDataSource<StaffMember>;

  /**
   * MatSort instance
   */
  sortInst: MatSort;

  /**
   * mat sort instance
   */
  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) {
      this.sortInst = sort;
    }
  };

  /**
   * MatPaginator instance
   */
  paginatorInst: MatPaginator;

  /**
   * mat paginator instance
   */
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.paginatorInst = paginator;
    }
  };

  /**
   * selection
   */
  public selection: SelectionModel<StaffMember>;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  constructor(public translateService: TranslateService, private cd: ChangeDetectorRef, public point: BreakpointService) {
  }

  ngOnInit() {

  }

  /**
   * init data source
   */
  private initDataSource() {
    this.dataSource = new MatTableDataSource(this._data);
    this.dataSource.sort = this.sortInst;
    this.dataSource.paginator = this.paginatorInst;
    this.selection = new SelectionModel(false, []);
    this.cd.markForCheck();
  }

  /**
   * map sortable column
   * @param column
   */
  isSortedColumn(column: string): boolean {
    return !this.listSortedColumn.includes(column);
  }

  selectionChange(event){
    console.log(event);
  }

}
