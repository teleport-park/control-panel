import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../models/';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { filter, finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import moment from 'moment';
import { TranslateService } from '../../../../common/translations-module';
import { PageEvent, Sort, SortDirection } from '@angular/material';
import { StorageService } from '../../../../services/storage.service';
import { DefaultPagination } from '../../../../models/default-pagination';
import { DefaultSort } from '../../../../models/default-sort';


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
   * sort api
   */
  static readonly SORT: any = environment.api.sorting;

  /**
   * search api
   */
  static readonly SEARCH: string = `${environment.origin}${environment.api.USERS}${environment.api.search.users}`;

  /**
   * storage key
   */
  public readonly STORAGE_KEY: string = 'USERS';

  /**
   * users subject
   */
  users$: BehaviorSubject<User[]> = new BehaviorSubject(null);

  /**
   * user count
   */
  userCount$: BehaviorSubject<number> = new BehaviorSubject(null);

  /**
   * user query string
   */
  _queryString = '';

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
   * get user count
   */
  getUsersCount(): void {
    this.http.get(`${UserService.USER_API}totalpages/1`)
      .subscribe((result: number) => {
        this.userCount$.next(result);
      });
  }

  /**
   * get users
   */
  getUsers(): void {
    this.loaderService.dispatchShowLoader(true);
    const params = this.getParams(this.STORAGE_KEY);
    this.http.get<User[]>(
      `${UserService.USER_API}`, {params})
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

  /**
   * find users
   * @param queryString
   */
  findUsers(queryString: string): void {
    this._queryString = queryString;
    this.loaderService.dispatchShowLoader(true);
    let params = this.getParams(this.STORAGE_KEY);
    params = params.set(environment.api.search.query, queryString);
    this.http.get(UserService.SEARCH, {params})
      .subscribe((users: User[]) => {
        const result = users.map((user: User) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          return Object.assign(new User(), user);
        });
        this.users$.next(result);
        this.loaderService.dispatchShowLoader(false);
      });
    this.searchResultCount(queryString);
  }

  /**
   * search result count
   * @param queryString
   */
  searchResultCount(queryString: string): void {
    const params = new HttpParams().set(environment.api.search.query, queryString);
    this.http.get(`${UserService.SEARCH}${environment.api.search.total}1`, {params})
      .subscribe((result: number) => {
        this.userCount$.next(result);
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
    this.userCount$.complete();
    this.users$.complete();
  }

  /**
   * change pagination handler
   * @param event
   */
  changePaginationOrSort(event: PageEvent | Sort): void {
    if (this._queryString) {
      this.findUsers(this._queryString);
      return;
    }
    this.getUsers();
  }

  /**
   * get params
   */
  private getParams(key: string) {
    const page = this.storage.getValue(`${key}_PAGINATION`) || new DefaultPagination();
    const sort = this.storage.getValue(`${key}_SORT`) || new DefaultSort();
    return new HttpParams()
      .set(UserService.PAGING.size, page.pageSize)
      .set(UserService.PAGING.page, page.pageIndex + 1)
      .set(UserService.SORT.column, sort.active)
      .set(UserService.SORT.direction, `${this.getDirection(sort.direction)}`);
  }

  /**
   * get direction
   * @param direction
   */
  private getDirection(direction: SortDirection) {
    switch (direction) {
      case 'asc': {
        return 2;
      }
      case 'desc': {
        return 1;
      }
      default: {
        return 0;
      }
    }
  }
}
