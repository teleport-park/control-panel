import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { TranslateService } from '../../translations-module';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointService } from '../../../services/breakpoint.service';
import { PropertyMap } from '../../../admin-module/utils/property-map';
import { IconService } from '../../../services/icon.service';
import { AppStorageKey } from '../../../models/app-storage-key';
import { IAppStorageInterface } from '../../../interfaces/app-storage-interface';
import { DefaultSort } from '../../../models/default-sort';
import { Moment } from 'moment';

@Component({
    selector: 'control-panel-ui-table',
    templateUrl: './control-panel-ui-table.component.html',
    styleUrls: ['./control-panel-ui-table.component.scss']
})
export class ControlPanelUiTableComponent<T> implements OnInit {

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
    @Input() set data(data: T[]) {
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
    @Input() set resetPagination(data: { reset: boolean }) {
        if (data && this.paginator) {
            this.paginator.pageIndex = 0;
            this.changePageHandler({pageIndex: 0, pageSize: this.paginator.pageSize} as PageEvent);
        }
    }

    @Input() minRowHeight = 50;

    @Input() card = false;

    @Input() deleteDisable = false;

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
    @ViewChild(MatSort, {static: true}) set sort(sort: MatSort) {
        if (sort) {
            this.sortInst = sort;
        }
    }

    /**
     * mat paginator instance
     */
    @ViewChild('paginator', {static: false}) paginator: MatPaginator;

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

    @Output() boundCard: EventEmitter<T> = new EventEmitter();

    /**
     * Emit pagination changes
     */
    @Output() pageChanges: EventEmitter<{ limit: number, offset: number }> = new EventEmitter<{ limit: number, offset: number }>();

    /**
     * Emit sort changes
     */
    @Output() sortChanges: EventEmitter<Sort> = new EventEmitter();

    /**
     * selected item
     */
    @Output() selected: EventEmitter<T> = new EventEmitter();

    /**
     * toggle item
     */
    @Output() toggle: EventEmitter<T> = new EventEmitter();

    /**
     * constructor
     */
    constructor(public translateService: TranslateService,
                private cd: ChangeDetectorRef,
                public point: BreakpointService,
                public injector: Injector,
                public icon: IconService,
                @Inject('IAppStorageInterface') private storage: IAppStorageInterface) {
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
        this.storage.setValue(`${this.storageKey}${AppStorageKey.Pagination}`, event);
        this.pageChanges.emit({limit: event.pageSize, offset: event.pageSize * event.pageIndex});
    }

    /**
     * add event
     */
    addEntity(): void {
        this.add.emit();
    }

    selectRow(row): void {
        this.selection.select(row);
        this.selected.emit(row);
    }

    /**
     * Change sort change
     * @param event
     */
    sortChange(event: Sort) {
        this.storage.setValue(`${this.storageKey}${AppStorageKey.Sort}`, event);
        this.sortChanges.emit(event);
    }

    /**
     * init table state
     */
    private initTableState() {
        if (this.storage && this.storage.getValue(`${this.storageKey}${AppStorageKey.Pagination}`)) {
            this.paginatorInit = this.storage.getValue(`${this.storageKey}${AppStorageKey.Pagination}`);
        }
        if (this.storage && this.storage.getValue(`${this.storageKey}${AppStorageKey.Sort}`)) {
            this.sortInst.active = this.storage.getValue<DefaultSort>(`${this.storageKey}${AppStorageKey.Sort}`).active;
            this.sortInst.direction = this.storage.getValue<DefaultSort>(`${this.storageKey}${AppStorageKey.Sort}`).direction;
        }
    }

    /**
     * get formatted data
     * @param data
     */
    getFormattedData(data: Moment): string {
        data.locale(this.translateService.locale.value);
        return data.format('L');
    }

    /**
     * check is boolean value
     * @param value
     */
    isBoolean(value: any) {
        return typeof value === 'boolean';
    }

    getBalance(balance: { currency: string, amount: number }[]): number {
        const amount = balance.map(i => i.amount).reduce((prev: number, curr: number) => prev + curr);
        return +amount.toFixed(2);
    }

    mapRoles = (role) => this.translateService.instant(role);
}
