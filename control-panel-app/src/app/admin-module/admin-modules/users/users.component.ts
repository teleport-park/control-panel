import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { User } from '../../../models';
import { MatDialog, MatSidenavContent, PageEvent } from '@angular/material';
import { TranslateService } from '../../../common/translations-module';
import { PropertyMap } from '../../utils/property-map';
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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersComponent implements OnInit, OnDestroy {

  listSortedColumn: FormControl = new FormControl([]);

  /**
   * quick filter value
   */
  quickFilter: FormControl = new FormControl('');

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
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'age', 'email', 'statuses', 'registered', 'submenu'];

  /**
   * column with data
   */
  columnWithData: string[] = ['firstName', 'lastName', 'phone', 'age', 'email'];

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
        // TODO insert quick filter logic from API
        console.warn('Quick filter value', value);
      }
    );
  }

  /**
   * open dialog
   * @param mode
   * @param event
   */
  openDialog(mode: 'edit' | 'add' | 'delete', event?: User): void {
    if (mode === 'delete') {
      this.showConfirmDialog(event);
      return;
    }
    this.showModalAddOrEditUser(mode, event);
  }

  /**
   * show add or remove dialog
   * @param mode
   * @param event
   */
  private showModalAddOrEditUser(mode: 'edit' | 'add' | 'delete', event) {
    this.dialog.open(AddOrEditEntityDialogComponent, {
      data: mode === 'edit' ? event : 'user'
    }).afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((user: User) => {
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
    this.userService.changePagination(event);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
