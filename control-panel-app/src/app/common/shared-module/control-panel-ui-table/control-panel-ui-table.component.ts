import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { StaffMember } from '../../../models';
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
  }

  /**
   * selection
   */
  public selection: SelectionModel<StaffMember>;

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
    if (this.storage && this.storage.getValue(this.storageKey)) {
      this.paginatorInit = this.storage.getValue(this.storageKey);
    } else {
      this.paginatorInit = new DefaultPagination();
    }
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
    this.storage.setValue(this.storageKey, event);
    this.pageChanges.emit(event);
  }

  /**
   * add event
   */
  addEntity(): void {
    this.add.emit();
  }

  sortChange(event: Sort) {
    this.storage.setValue(`${this.storageKey}_SORT`, event);
    this.sortChanges.emit(event);
  }
}
