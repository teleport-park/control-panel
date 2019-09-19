import { Inject, Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../../models';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../../../../../services/loader.service';
import { TranslateService } from '../../../../../common/translations-module';
import { PageEvent, Sort } from '@angular/material';
import { AppData } from '../../../../../interfaces';
import { BuildParamsHelper } from '../../../../../utils/build-params-helper';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { IAppStorageInterface } from '../../../../../interfaces/app-storage-interface';
import { Avatar } from '../../../../../models/user-management/avatar.model';


@Injectable()
export class UserService implements OnDestroy {

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
    getUser(userId: number): Observable<User> {
        return of({} as User);
        // const requestMethod = 'GET';
        // const url = this.apiBuilder.getUsersUrl(requestMethod, userId);
        // return this.http.request<AppData<User>>(requestMethod, url).pipe(map((result: AppData<User>) => {
        //   const user = result.items[0];
        //   user.registered = moment(user.registered);
        //   user.birthday = moment(user.birthday);
        //   user.avatars = this.getUserAvatars(user.id);
        //   user.lastVisit = moment(this.randomDate(new Date(2019, 0, 1), new Date()));
        //   return user;
        // }), catchError((err) => {
        //   console.warn(err);
        //   this.loaderService.dispatchShowLoader(false);
        //   return EMPTY;
        // }));
    }

    /**
     * get users
     */
    getUsers(): void {
        this.usersData$.next({} as AppData<User>);
        // this.loaderService.dispatchShowLoader(true);
        // const requestMethod = 'GET';
        // const params: any = this._paramsHelper.getParams(this.STORAGE_KEY, this.storage);
        // const url = this.apiBuilder.getUsersUrl(
        //   requestMethod,
        //   null,
        //   params.pageSize,
        //   params.pageIndex + 1,
        //   params.active,
        //   params.direction,
        //   this.queryString
        // );
        // this.http.request<AppData<User>>(requestMethod, url)
        //   .pipe(
        //     finalize(() => {
        //       this.loaderService.dispatchShowLoader(false);
        //     }))
        //   .subscribe((data: AppData<User>) => {
        //     data.items = data.items.map((user: User) => {
        //       moment.locale(this.translateService.locale.getValue());
        //       user.registered = moment(user.registered);
        //       user.avatars = this.getUserAvatars(user.id);
        //       return user;
        //     });
        //     this.usersData$.next(data);
        //   });
    }

    /**
     * save user
     */
    saveUser(user: User): void {
        const requestMethod = 'POST';
        this.loaderService.dispatchShowLoader(true);
        const url = this.apiBuilder.getUsersUrl(requestMethod);
        this.saveAvatarsToStorage(user);
        this.http.request(requestMethod, url, {body: user}).pipe(catchError((err) => {
            console.warn(err);
            this.loaderService.dispatchShowLoader(false);
            return EMPTY;
        })).subscribe(() => {
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
        this.saveAvatarsToStorage(user);
        this.http.request(requestMethod, url, {body: user}).pipe(catchError((err) => {
            console.warn(err);
            this.loaderService.dispatchShowLoader(false);
            return EMPTY;
        })).subscribe(() => {
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
        this.http.request(requestMethod, url).pipe(catchError((err) => {
            console.warn(err);
            this.loaderService.dispatchShowLoader(false);
            return EMPTY;
        })).subscribe(() => {
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
     * TODO should removed after integrate new api
     * @param userId
     */
    getUserAvatars(userId: number): Avatar[] {
        const avatar = JSON.parse(localStorage.getItem('AVATARS'));
        return avatar && avatar[userId] ? avatar[userId] : [];
    }

    /**
     * TODO should removed after integrate new api
     * @param start
     * @param end
     */
    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}