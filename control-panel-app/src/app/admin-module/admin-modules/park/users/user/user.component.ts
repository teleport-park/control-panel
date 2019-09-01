import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../../../../../models';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateService } from '../../../../../common/translations-module';
import { PropertyMap } from '../../../../utils/property-map';
import moment from 'moment';
import { AddOrEditEntityDialogComponent } from '../../../../../common/shared-module';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  /**
   * property map
   */
  propertyMap = PropertyMap;

  /**
   * user id
   */
  userId: string;

  /**
   * user
   */
  _user: User;

  /**
   * user properties values
   */
  _userPropertiesValue: any;

  /**
   * user properties keys
   */
  _userProperties: string[];

  /**
   * simple columns
   */
  simpleDataColumn = ['name', 'age'];

  /**
   * displayed column
   */
  displayedColumns = ['name', 'age', 'gender'];

  private destroyed$: Subject<boolean> = new Subject();

  /**
   *
   * @param route
   * @param router
   * @param service
   * @param translateService
   * @param cd
   * @param dialog
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: UserService,
              public translateService: TranslateService,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.service.usersData$.pipe(filter(data => !!data), takeUntil(this.destroyed$)).subscribe(() => {
      this.getUser();
    });
  }

  /**
   * get users
   */
  private getUser() {
    this.service.getUser(+this.userId)
      .pipe(filter(data => !!data), takeUntil(this.destroyed$))
      .subscribe((user: User) => {
        this._user = Object.assign(new User(), user);
        this._userPropertiesValue = Object.assign({}, this._user.getUserProperty());
        this._userPropertiesValue.birthday = moment(this._user.birthday).format('L');
        this._userPropertiesValue.registered = moment(this._user.registered).format('L');
        this._userPropertiesValue.lastVisit = moment(this._user.lastVisit).format('L, h:mm');
        this._userProperties = Object.keys(this._userPropertiesValue);
        this.cd.markForCheck();
      });
  }

  /**
   * open modal dialog
   */
  private openModalDialog() {
    this.dialog.open(AddOrEditEntityDialogComponent, {
      data: this._user,
      disableClose: true
    }).afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((result: User) => {
      this.service.editUser(result);
    });
  }

  /**
   * back to users
   */
  back() {
    this.router.navigate(['admin', 'user-management', 'users']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
