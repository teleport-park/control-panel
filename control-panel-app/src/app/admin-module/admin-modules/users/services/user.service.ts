import { Inject, Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../models/';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import moment from 'moment';
import { TranslateService } from '../../../../common/translations-module';
import { PageEvent, Sort } from '@angular/material';
import { AppData } from '../../../../interfaces';
import { BuildParamsHelper } from '../../../../utils/build-params-helper';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { Avatar } from '../../../../models/avatar.model';


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
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface) {
    this.getUsers();
  }

  /**
   *
   * @param userId
   */
  getUser(userId: number): Observable<AppData<User>> {
    const requestMethod = 'GET';
    const url = this.apiBuilder.getUsersUrl(requestMethod, userId);
    return this.http.request<AppData<User>>(requestMethod, url);
  }

  /**
   * get users
   */
  getUsers(): void {
    this.loaderService.dispatchShowLoader(true);
    const requestMethod = 'GET';
    const params: any = this._paramsHelper.getParams(this.STORAGE_KEY, this.storage);
    const url = this.apiBuilder.getUsersUrl(
      requestMethod,
      null,
      params.pageSize,
      params.pageIndex + 1,
      params.active,
      params.direction,
      this.queryString
    );
    this.http.request<AppData<User>>(requestMethod, url)
      .pipe(
        finalize(() => {
          this.loaderService.dispatchShowLoader(false);
        }))
      .subscribe((data: AppData<User>) => {
        data.items = data.items.map((user: User) => {
          moment.locale(this.translateService.locale.getValue());
          user.registered = moment(user.registered);
          user.userName = user.firstName;
          user.nickName = user.lastName;
          user.avatars = this.getUserAvatars(user.id);
          return user;
        });
        this.usersData$.next(data);
      });
  }

  /**
   * save user
   */
  saveUser(user: User): void {
    const requestMethod = 'POST';
    this.loaderService.dispatchShowLoader(true);
    const url = this.apiBuilder.getUsersUrl(requestMethod);
    this.prepareUserToSave(user);
    this.saveAvatarsToStorage(user);
    this.http.request(requestMethod, url, {body: user}).subscribe(() => {
      this.getUsers();
    });
  }

  /**
   * edit user
   */
  editUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    const requestMethod = 'PUT';
    const url = this.apiBuilder.getUsersUrl(requestMethod, user.id);
    this.prepareUserToSave(user);
    this.saveAvatarsToStorage(user);
    this.http.request(requestMethod, url, {body: user}).subscribe(() => {
      this.getUsers();
    });
  }

  /**
   * remove user
   */
  removeUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    const requestMethod = 'DELETE';
    const url = this.apiBuilder.getUsersUrl(requestMethod, user.id);
    this.http.request(requestMethod, url).subscribe(() => {
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

  /**
   * TODO should removed after integrate new api
   * @param user
   */
  saveAvatarsToStorage(user: User): void {
    const avatars = JSON.parse(localStorage.getItem('AVATARS')) || {};
    avatars[user.id] = user.avatars || [];
    localStorage.setItem('AVATARS', JSON.stringify(avatars));
  }

  /**
   * prepare user
   * TODO should be removed after integrate new api
   * @param user
   */
  private prepareUserToSave(user: User) {
    user.firstName = user.userName;
    user.lastName = user.nickName;
  }

  /**
   * TODO should removed after integrate new api
   * @param userId
   */
  getUserAvatars(userId: number): Avatar[] {
    const avatar = JSON.parse(localStorage.getItem('AVATARS'));
    return avatar && avatar[userId] ? avatar[userId] : [];
  }
}
