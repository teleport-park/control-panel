import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointService } from '../../../services/breakpoint.service';
import { PropertyMap } from '../../../admin-module/utils/property-map';
import { IconService } from '../../../services/icon.service';
import { StorageService } from '../../../services/storage.service';
import { DefaultPagination } from '../../../models/default-pagination';

@Component({
  selector: 'control-panel-ui-table',
  templateUrl: './control-panel-ui-table.component.html',
  styleUrls: ['./control-panel-ui-table.component.scss']
})
export class ControlPanelUiTableComponent implements OnInit {

  /**
   * property translations map
   */
  propertyMap = PropertyMap;

  _data: any[];

  @Input() valueMap: string[] = [];

  @Input() displayedColumns: string[] = [];

  @Input() simpleDataColumn: string[] = [];

  @Input() listSortedColumn: string[] = [];

  /**
   * items total count
   */
  @Input() itemCount: number;

  /**
   * icon set
   */
  @Input() iconSet: string;

  /**
   * data source for table
   */
  @Input() set data(data: any[]) {
    if (data) {
      this._data = data;
      this.initDataSource();
    }
  }

  paginatorInit: PageEvent;

  @Input() storageKey: string;

  /**
   * reset pagination
   * @param data
   */
  @Input() set resetPagination(data: { reset: true }) {
    if (data) {
      this.paginator.pageIndex = 0;
      this.changePageHandler({pageIndex: 0, pageSize: this.paginator.pageSize} as PageEvent);
    }
  }

  /**
   * data source for table
   */
  public dataSource: MatTableDataSource<any>;

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
  }

  /**
   * mat paginator instance
   */
  @ViewChild('paginator') paginator: MatPaginator;

  /**
   * selection
   */
  public selection: SelectionModel<any>;

  /**
   * delete emit
   */
  @Output() delete: EventEmitter<any> = new EventEmitter();

  /**
   * edit emit
   */
  @Output() edit: EventEmitter<any> = new EventEmitter();

  /**
   * add emit
   */
  @Output() add: EventEmitter<void> = new EventEmitter();

  /**
   * Emit pagination changes
   */
  @Output() pageChanges: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  /**
   * Emit sort changes
   */
  @Output() sortChanges: EventEmitter<Sort> = new EventEmitter();

  /**
   * constructor
   * @param translateService
   * @param cd
   * @param point
   * @param injector
   * @param icon
   * @param storage
   */
  constructor(public translateService: TranslateService,
              private cd: ChangeDetectorRef,
              public point: BreakpointService,
              public injector: Injector,
              public icon: IconService,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.initTableState();
  }

  /**
   * init data source
   */
  private initDataSource() {
    this.dataSource = new MatTableDataSource(this._data);
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

  /**
   * change page
   * @param event
   */
  changePageHandler(event: PageEvent): void {
    this.storage.setValue(`${this.storageKey}_PAGINATION`, event);
    this.pageChanges.emit(event);
  }

  /**
   * add event
   */
  addEntity(): void {
    this.add.emit();
  }

  /**
   * Change sort change
   * @param event
   */
  sortChange(event: Sort) {
    this.storage.setValue(`${this.storageKey}_SORT`, event);
    this.sortChanges.emit(event);
  }

  /**
   * init table state
   */
  private initTableState() {
    if (this.storage && this.storage.getValue(`${this.storageKey}_PAGINATION`)) {
      this.paginatorInit = this.storage.getValue(`${this.storageKey}_PAGINATION`);
    } else {
      this.paginatorInit = new DefaultPagination();
    }
    if (this.storage && this.storage.getValue(`${this.storageKey}_SORT`)) {
      this.sortInst.active = this.storage.getValue(`${this.storageKey}_SORT`).active;
      this.sortInst.direction = this.storage.getValue(`${this.storageKey}_SORT`).direction;
    }
  }
}
