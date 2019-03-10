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
import { AddOrEditUserDialogComponent } from "../../../common/user-form";
import * as moment from 'moment'
import { Moment } from 'moment'
import { ConfirmDialogComponent, ConfirmDialogData } from "../../../common/shared-module";

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

  /**
   * selection
   */
  public selection: SelectionModel<User>;

  /**
   * user count
   * TODO discuss this functionality (how append index for users)
   */
  userCount: number;

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
              public translateService: TranslateService,
              private loaderService: LoaderService,
              public dialog: MatDialog) {
  }

  /**
   * on init hook
   */
  ngOnInit() {
    this.loaderService.dispatchShowLoader(true);
    this.userService.getUsers();
    this.userService.users$.pipe(filter(data => !!data), takeUntil(this.destroyed$)).subscribe(
      (users: User[]) => {
        this.users = users.map((user: User) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          this.userCount = user.index > this.userCount ? user.index : this.userCount;
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
        user.index = ++this.userCount;
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

  private prepareUser(user: User) {
    user.registered = <Moment>user.registered.format('YYYY-MM-DD');
    user.dateOfBirth = <Moment>user.dateOfBirth.format('YYYY-MM-DD');
  }
}
