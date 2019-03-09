import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from "./services/user.service";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "../../../models/user.model";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from "../../../common/translations-module";
import { UserPropertyMap } from "./services/user-property-map";
import { Subject } from "rxjs";
import { LoaderService } from "../../../services/loader.service";
import { SelectionModel } from '@angular/cdk/collections';
import { AddUserDialogComponent } from "../../../common/user-form";
import * as moment from 'moment'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  /**
   * title of component
   */
  TITLE: string = 'ADMIN_MENU_USERS';

  destroyed$: Subject<boolean> = new Subject();

  /**
   * moment instance for template
   */
  momentInstance = moment;

  /**
   * mat sort instance
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * mat paginator instance
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * property translations map
   */
  propertyMap = UserPropertyMap;

  /**
   * data source for table
   */
  public dataSource: MatTableDataSource<User>;

  public selection: SelectionModel<User>;

  /**
   * Users
   */
  users: User[];

  /**
   * list of displayed column
   */
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'phone', 'isActive', 'age', 'email', 'registered'];

  /**
   * Constructor
   * @param userService
   * @param cd
   * @param translateService
   * @param loaderService
   * @param dialog
   */
  constructor(public userService: UserService,
              private cd: ChangeDetectorRef,
              private translateService: TranslateService,
              private loaderService: LoaderService,
              public dialog: MatDialog) {
  }

  /**
   * on init hook
   */
  ngOnInit() {
    this.loaderService.dispatchShowLoader(true);
    this.userService.getUsers().pipe(filter(data => !!data), takeUntil(this.destroyed$)).subscribe(
      (users: User[]) => {
        this.users = users.map((user: User) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          return Object.assign(new User(), user)
        });
        this.dataSource = new MatTableDataSource(this.users);
        this.selection = new SelectionModel(false, []);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cd.markForCheck();
        this.loaderService.dispatchShowLoader(false)
      });
  }

  /**
   * apply table filter
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(mode: 'edit' | 'add'): void {
    this.dialog.open(AddUserDialogComponent, {
      data: mode === 'edit' ? this.selection.selected[0] : null
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete()
  }
}
