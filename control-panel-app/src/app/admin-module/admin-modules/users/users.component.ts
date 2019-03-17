import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from "./services/user.service";
import { debounceTime, filter, finalize, takeUntil } from "rxjs/operators";
import { User } from "../../../models";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from "../../../common/translations-module";
import { UserPropertyMap } from "./services/user-property-map";
import { Subject } from "rxjs";
import { LoaderService } from "../../../services/loader.service";
import { SelectionModel } from '@angular/cdk/collections';
import { AddOrEditUserDialogComponent } from "../../../common/user-form";
import * as moment from 'moment'
import { Moment } from 'moment'
import { ConfirmDialogComponent, ConfirmDialogData } from "../../../common/shared-module";
import { FormControl } from "@angular/forms";
import { BreakpointService } from "../../../services/breakpoint.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

  listSortedColumn: FormControl = new FormControl([]);

  quickFilter: FormControl = new FormControl('');

  /**
   * subject for destroy component
   */
  destroyed$: Subject<boolean> = new Subject();

  /**
   * MatSort instance
   */
  sortInst: MatSort;

  /**
   * mat sort instance
   */
  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (this.dataSource) {
      this.sortInst = sort || null;
      this.dataSource.sort = sort || null;
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
    if (this.dataSource) {
      this.paginatorInst = paginator || null;
      this.dataSource.paginator = paginator || null;
    }
  };

  /**
   * property translations map
   */
  propertyMap = UserPropertyMap;

  /**
   * data source for table
   */
  public dataSource: MatTableDataSource<User>;

  /**
   * selection
   */
  public selection: SelectionModel<User>;

  /**
   * Users
   */
  users: User[];

  /**
   * list of displayed column
   */
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'phone', 'age', 'email', 'isActive', 'registered', 'submenu'];

  /**
   * column with data
   */
  columnWithData: string[] = ['firstName', 'lastName', 'phone', 'age', 'email', 'registered'];

  /**
   * available to sort column
   */
  listAvailableToSortColumn: string[] = ['firstName', 'lastName', 'age', 'registered'];

  /**
   * Constructor
   * @param userService
   * @param cd
   * @param translateService
   * @param loaderService
   * @param dialog
   * @param point
   */
  constructor(public userService: UserService,
              private cd: ChangeDetectorRef,
              public translateService: TranslateService,
              private loaderService: LoaderService,
              public dialog: MatDialog,
              public point: BreakpointService) {
  }

  /**
   * on init hook
   */
  ngOnInit() {
    this.loaderService.dispatchShowLoader(true);
    this.userService.getUsers();
    this.userService.users$.pipe(filter(data => !!data), takeUntil(this.destroyed$), finalize(() => {
      this.loaderService.dispatchShowLoader(false);
    })).subscribe(
      (users: User[]) => {
        this.users = users.map((user: User, index: number) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          user.index = ++index;
          return Object.assign(new User(), user)
        });
        this.initDataSource();
        this.cd.markForCheck();
      });
    this.quickFilter.valueChanges.pipe(debounceTime(300), takeUntil(this.destroyed$)).subscribe(
      (value: string) => {
        // TODO insert quick filter logic from API
        this.dataSource.filter = value.trim().toLowerCase();
      }
    )
  }

  /**
   * init data source
   */
  private initDataSource() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sortInst;
    this.dataSource.paginator = this.paginatorInst;
    this.selection = new SelectionModel(false, []);
  }

  /**
   * open dialog
   * @param mode
   */
  openDialog(mode: 'edit' | 'add' | 'delete'): void {
    if (mode === 'delete') {
      this.showConfirmDialog();
      return;
    }
    this.showModalAddOrRemoveUser(mode);
  }

  /**
   * show add or remove dialog
   * @param mode
   */
  private showModalAddOrRemoveUser(mode: "edit" | "add" | "delete") {
    this.dialog.open(AddOrEditUserDialogComponent, {
      data: mode === 'edit' ? this.selection.selected[0] : null
    }).afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((user: User) => {
      this.prepareUser(user);
      if (mode === 'edit') {
        this.userService.editUser(user);
      } else {
        this.userService.saveUser(user);
      }
    });
  }

  /**
   * show confirm dialog
   */
  private showConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_CONFIRM_MESSAGE',
        messageParams: [this.selection.selected[0].firstName, this.selection.selected[0].lastName]
      }
    }).afterClosed()
      .pipe(filter(data => data), takeUntil(this.destroyed$))
      .subscribe((result: boolean) => {
        this.userService.removeUser(this.selection.selected[0]);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete()
  }

  /**
   * prepare user
   * @param user
   */
  private prepareUser(user: User) {
    user.registered = <Moment>user.registered.format('YYYY-MM-DD');
    user.dateOfBirth = <Moment>user.dateOfBirth.format('YYYY-MM-DD');
  }

  /**
   * map sortable column
   * @param column
   */
  isSortedColumn(column: string): boolean {
    return !this.listSortedColumn.value.includes(column);
  }
}
