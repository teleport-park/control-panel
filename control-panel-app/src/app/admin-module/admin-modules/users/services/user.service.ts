import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../models/';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { filter, finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';


@Injectable()
export class UserService implements OnDestroy {

  static readonly USER_API: string = `${environment.origin}${environment.api.USERS}`;

  /**
   * users subject
   */
  users$: Subject<User[]> = new Subject();

  /**
   * constructor
   * @param http
   * @param loaderService
   */
  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  /**
   * get users
   */
  getUsers(): void {
    this.http.get<User[]>(`${UserService.USER_API}`)
      .pipe(filter(data => !!data), finalize(() => {
        this.loaderService.dispatchShowLoader(false);
      }))
      .subscribe((users: User[]) => {
        this.users$.next(users);
      });
  }

  /**
   * save user
   */
  saveUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.post(`${UserService.USER_API}`, user).subscribe(() => {
      this.getUsers();
    });
  }

  /**
   * edit user
   */
  editUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.put(`${UserService.USER_API}/${user.id}`, user).subscribe(() => {
      this.getUsers();
    });
  }

  /**
   * remove user
   */
  removeUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.delete(`${UserService.USER_API}/${user.id}`).subscribe(() => {
      this.getUsers();
    });
  }

  /**
   * In destroy hook
   */
  ngOnDestroy(): void {
    this.users$.complete();
  }
}
