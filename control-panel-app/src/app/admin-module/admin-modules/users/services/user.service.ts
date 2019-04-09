import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../models/';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import moment from 'moment';
import { TranslateService } from '../../../../common/translations-module';
import { PageEvent, Sort } from '@angular/material';
import { StorageService } from '../../../../services/storage.service';
import { AppData } from '../../../../interfaces';
import { BuildParamsHelper } from '../../../../utils/build-params-helper';
import { ApiUrlBuilder } from '../../../../models/api-url-builder';
import { ApiUrlsService } from '../../../../services/api-urls.service';


@Injectable()
export class UserService implements OnDestroy {

  /**
   * user api
   */
  static readonly USER_API: string = `${environment.origin}${environment.api.USERS}`;

  /**
   * storage key
   */
  public readonly STORAGE_KEY: string = 'USERS';

  /**
   * users subject
   */
  usersData$: BehaviorSubject<AppData<User>> = new BehaviorSubject(null);

  /**
   * user query string
   */
  queryString = '';

  /**
   * params builder
   */
  private _paramsHelper: BuildParamsHelper = new BuildParamsHelper();

  /**
   * constructor
   * @param http
   * @param apiBuilder
   * @param loaderService
   * @param translateService
   * @param storage
   */
  constructor(private http: HttpClient,
              private apiBuilder: ApiUrlsService,
              private loaderService: LoaderService,
              private translateService: TranslateService,
              public storage: StorageService) {
    this.getUsers();
  }

  /**
   *
   * @param userId
   */
  getUser(userId: number): Observable<AppData<User>> {
    return this.http.request<AppData<User>>('GET', this.apiBuilder.getUsersUrl('GET', userId));
  }

  /**
   * get users
   */
  getUsers(): void {
    this.loaderService.dispatchShowLoader(true);
    let params: any = this._paramsHelper.getParams(this.STORAGE_KEY, this.storage);
    if (this.queryString) {
      params = params.set(environment.api.SEARCH, this.queryString);
    }
    this.http.request<AppData<User>>('GET',
        this.apiBuilder.getUsersUrl(
          'GET',
          null,
          params.pageSize,
          params.pageIndex + 1,
          params.active,
          params.direction))
      .pipe(
        finalize(() => {
          this.loaderService.dispatchShowLoader(false);
        }))
      .subscribe((data: AppData<User>) => {
        data.items = data.items.map((user: User) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          return user;
        });
        this.usersData$.next(data);
      });
  }

  /**
   * save user
   */
  saveUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.request('POST', this.apiBuilder.getUsersUrl('POST'), {body: user}).subscribe(() => {
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
    this.usersData$.complete();
  }

  /**
   * change pagination handler
   * @param event
   */
  changePaginationOrSort(event: PageEvent | Sort): void {
    this.getUsers();
  }
}
