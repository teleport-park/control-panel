import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../models/';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { filter, finalize, map } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import * as moment from 'moment';
import { TranslateService } from '../../../../common/translations-module';
import { PageEvent } from '@angular/material';
import { StorageService } from '../../../../services/storage.service';


@Injectable()
export class UserService implements OnDestroy {

  /**
   * user api
   */
  static readonly USER_API: string = `${environment.origin}${environment.api.USERS}`;

  /**
   * paging api
   */
  static readonly PAGING: any = environment.api.paging;

  /**
   * storage key
   */
  public readonly STORAGE_KEY: string = 'USER_PAGINATION';

  /**
   * users subject
   */
  users$: BehaviorSubject<User[]> = new BehaviorSubject(null);

  /**
   * user count
   */
  userCount$: Observable<number>;

  /**
   * constructor
   * @param http
   * @param loaderService
   * @param translateService
   * @param storage
   */
  constructor(private http: HttpClient,
              private loaderService: LoaderService,
              private translateService: TranslateService,
              public storage: StorageService) {
    this.getUsersCount();
    this.getUsers();
  }

  /**
   * change pagination handler
   * @param event
   */
  changePagination(event: PageEvent): void {
    this.storage.setPaginationValue(this.STORAGE_KEY, event);
    this.getUsers();
  }

  /**
   * get user count
   */
  getUsersCount(): void {
    this.userCount$ = this.http.get(`${UserService.USER_API}totalpages/1`).pipe(
      map((result: number) => result)
    );
  }

  /**
   * get users
   */
  getUsers(): void {
    const page = this.storage.getPaginationValue(this.STORAGE_KEY);
    this.loaderService.dispatchShowLoader(true);
    this.http.get<User[]>(
      `${UserService.USER_API}?${UserService.PAGING.size}${page.pageSize}&${UserService.PAGING.page}${page.pageIndex + 1}`)
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
      this.getUsersCount();
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
