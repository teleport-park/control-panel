import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { filter } from "rxjs/operators";
import { User } from "../../../../models/user.model";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  TITLE: string = 'ADMIN_MENU_USERS';

  /**
   * mat sort instance
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * mat paginator instance
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
   */
  constructor(public userService: UserService, private cd: ChangeDetectorRef) { }

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
  }
}
