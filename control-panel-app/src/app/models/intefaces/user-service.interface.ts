import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserType } from '../types';
import { RequestHelper } from '../helpers/request-helper';

export interface UserService<T> {
    requestHelper: RequestHelper;
    users$: BehaviorSubject<T[]>;
    getUsers(query?: string): void;
    getUser(id: string): Observable<T>;
    editUser(user: T): void;
    addUser(user: T): void;
    deleteUser(id: string): void;
}

export const USER_SERVICE = new InjectionToken<UserService<UserType>>('UserService');
