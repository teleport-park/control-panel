import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { User } from '../../../models';
import { MatDialog, MatSidenavContent, PageEvent, Sort } from '@angular/material';
import { TranslateService } from '../../../common/translations-module';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';
import {
  AddOrEditEntityDialogComponent,
  ConfirmDialogComponent,
  ConfirmDialogData
} from '../../../common/shared-module';
import { FormControl } from '@angular/forms';
import { BreakpointService } from '../../../services/breakpoint.service';
import { StorageService } from '../../../services/storage.service';

import {default as config} from '../../../../app-config.json';
import { Config } from '../../../interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersComponent implements OnInit, OnDestroy {

  /**
   * quick filter value
   */
  quickFilter: FormControl = new FormControl('');

  /**
   * reset pagination
   */
  resetPagination: {reset: boolean};

  /**
   * view scroll container for set and store scroll position
   * @param element
   */
  @ViewChild('scrollContainer') set scrollContainer(element: MatSidenavContent) {
    if (element) {
      const storedScroll = this.storage.getValue(`${this.userService.STORAGE_KEY}_SCROLL`);
      if (storedScroll) {
        element.getElementRef().nativeElement.scrollTop = storedScroll;
      }
      element.elementScrolled().pipe(debounceTime(1000)).subscribe((event: any) => {
        this.storage.setValue(`${this.userService.STORAGE_KEY}_SCROLL`, event.target.scrollTop);
      });
    }
  }

  /**
   * subject for destroy component
   */
  destroyed$: Subject<boolean> = new Subject();

  /**
   * list of displayed column
   */
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'age', 'email', 'statuses', 'registered', 'submenu'];

  /**
   * column with data
   */
  columnWithData: string[] = ['firstName', 'lastName', 'phone', 'age', 'email'];

  /**
   * available to sort column
   */
  sortedColumn: string[] = [];

  /**
   * Constructor
   * @param userService
   * @param cd
   * @param translateService
   * @param loaderService
   * @param dialog
   * @param point
   * @param storage
   */
  constructor(public userService: UserService,
              private cd: ChangeDetectorRef,
              public translateService: TranslateService,
              private loaderService: LoaderService,
              public dialog: MatDialog,
              public point: BreakpointService,
              private storage: StorageService) {
  }

  /**
   * on init hook
   */
  ngOnInit() {
    this.quickFilter.valueChanges.pipe(debounceTime(300), takeUntil(this.destroyed$)).subscribe(
      (value: string) => {
        this.userService.findUsers(value);
        this.resetPagination = {reset: true};
      }
    );
    const data = config as Config;
    this.sortedColumn = data.users.sortedColumns || [];
  }

  /**
   * open dialog
   * @param mode
   * @param event
   */
  operationWithUser(mode: 'edit' | 'add' | 'delete', event?: User): void {
    if (mode === 'delete') {
      this.showConfirmDialog(event);
      return;
    }
    this.showModalAddOrEditUser(mode, event);
  }

  /**
   * show add or remove dialog
   * @param mode
   * @param user
   */
  private showModalAddOrEditUser(mode: 'edit' | 'add', user: User) {
    if (mode === 'edit') {
      this.userService.getUser(user.id).subscribe((result: User) => {
        this.openModalDialog(mode, result);
      });
      return;
    }
    this.openModalDialog(mode, user);
  }

  /**
   * open modal dialog
   * @param mode
   * @param user
   */
  private openModalDialog(mode: 'edit' | 'add', user: User) {
    this.dialog.open(AddOrEditEntityDialogComponent, {
      data: mode === 'edit' ? Object.assign(new User(), user) : 'user'
    }).afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((result: User) => {
      if (mode === 'edit') {
        this.userService.editUser(result);
      } else {
        this.userService.saveUser(result);
      }
    });
  }

  /**
   * show confirm dialog
   */
  private showConfirmDialog(user: User) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_CONFIRM_MESSAGE',
        messageParams: [`${user.firstName} ${user.lastName}`]
      } as ConfirmDialogData
    }).afterClosed()
      .pipe(filter(data => data), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.userService.removeUser(user);
      });
  }

  /**
   * change page handler
   * @param event
   */
  pageChangeHandler(event: PageEvent): void {
    this.userService.changePaginationOrSort(event);
  }

  sortChangeHandler(event: Sort): void {
    this.userService.changePaginationOrSort(event);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
