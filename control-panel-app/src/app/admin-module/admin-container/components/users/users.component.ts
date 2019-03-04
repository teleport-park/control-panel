import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { filter } from "rxjs/operators";
import { User } from "../../../../models/user.model";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from "../../services/translate.service";
import { UserPropertyMap } from "./user-property-map";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  /**
   * title of component
   */
  TITLE: string = 'ADMIN_MENU_USERS';
  /**
   * trigger for translations pipe
   */
  t: number;

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
  private dataSource: MatTableDataSource<User>;
  /**
   * Users
   */
  users: User[];

  /**
   * list of displayed column
   */
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'phone', 'isActive', 'age', 'email'];

  /**
   * Constructor
   * @param userService
   * @param cd
   * @param translateService
   */
  constructor(public userService: UserService, private cd: ChangeDetectorRef, private translateService: TranslateService) { }

  /**
   * on init hook
   */
  ngOnInit() {
    this.userService.getUsers().pipe(filter(data => !!data)).subscribe(
      (users: User[]) => {
        this.users = users.map((user: User) => {
          return Object.assign(new User(), user)
        });
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cd.markForCheck();
      }
    );
    this.translateService.locale.subscribe((locale: string) => {
      this.t = Math.random();
      this.cd.markForCheck();
    })
  }
}
