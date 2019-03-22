import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../models/';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { filter, finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import * as moment from 'moment';
import { TranslateService } from '../../../../common/translations-module';


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
   * @param translateService
   */
  constructor(private http: HttpClient, private loaderService: LoaderService, private translateService: TranslateService) {
  }

  /**
   * get users
   */
  getUsers(): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.get<User[]>(`${UserService.USER_API}`)
      .pipe(filter(data => !!data), finalize(() => {
        this.loaderService.dispatchShowLoader(false);
      }))
      .subscribe((users: User[]) => {
        const result = users.map((user: User) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          return Object.assign(new User(), user);
        });
        this.users$.next(result);
      });
  }

  // getUsers(): void {
  //   this.loaderService.dispatchShowLoader(true);
  //   this.users$ = this.http.get<User[]>(`${UserService.USER_API}`)
  //       .pipe(
  //           filter(data => !!data),
  //           finalize(() => {
  //             this.loaderService.dispatchShowLoader(false);
  //           }),
  //           map(x => {
  //             x.forEach(item => {
  //               moment.locale(this.translateService.locale.getValue());
  //               item.registered = moment(item.registered);
  //               return item;
  //             });
  //             return x;
  //           })
  //       );

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
    this.http.put(`${UserService.USER_API}${user.id}`, user).subscribe(() => {
      this.getUsers();
    });
  }

  /**
   * remove user
   */
  removeUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.delete(`${UserService.USER_API}${user.id}`).subscribe(() => {
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
