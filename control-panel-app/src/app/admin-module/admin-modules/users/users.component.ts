import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";
import { debounceTime, filter, finalize, takeUntil } from "rxjs/operators";
import { User } from "../../../models";
import { MatDialog } from '@angular/material';
import { TranslateService } from "../../../common/translations-module";
import { PropertyMap } from "../../utils/property-map";
import { Subject } from "rxjs";
import { LoaderService } from "../../../services/loader.service";
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

  propertyMap = PropertyMap;

  /**
   * subject for destroy component
   */
  destroyed$: Subject<boolean> = new Subject();

  /**
   * Users
   */
  _users: User[];

  /**
   * list of displayed column
   */
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'age', 'email', 'isActive', 'registered', 'submenu'];

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
        this._users = users.map((user: User, index: number) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          user.index = ++index;
          return Object.assign(new User(), user)
        });
        this.cd.markForCheck();
      });
    this.quickFilter.valueChanges.pipe(debounceTime(300), takeUntil(this.destroyed$)).subscribe(
      (value: string) => {
        // TODO insert quick filter logic from API
        console.warn('Quick filter value', value)
      }
    )
  }

  /**
   * open dialog
   * @param mode
   * @param event
   */
  openDialog(mode: 'edit' | 'add' | 'delete', event: User): void {
    if (mode === 'delete') {
      this.showConfirmDialog(event);
      return;
    }
    this.showModalAddOrRemoveUser(mode, event);
  }

  /**
   * show add or remove dialog
   * @param mode
   * @param event
   */
  private showModalAddOrRemoveUser(mode: "edit" | "add" | "delete", event) {
    this.dialog.open(AddOrEditUserDialogComponent, {
      data: mode === 'edit' ? event : null
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
  private showConfirmDialog(user: User) {
    this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_CONFIRM_MESSAGE',
        messageParams: [user.firstName, user.lastName]
      }
    }).afterClosed()
      .pipe(filter(data => data), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.userService.removeUser(user);
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
}
