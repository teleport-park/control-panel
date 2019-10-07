import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserType } from '../types';
import { Pagination } from '../classes/pagination';

export interface UserService<T> {
    pagination: Pagination;
    users$: BehaviorSubject<T[]>;
    getUsers(query?: string): void;
    getUser(id: string): Observable<T>;
    editUser(user: T): void;
    addUser(user: T): void;
    deleteUser(id: string): void;
}

export const USER_SERVICE = new InjectionToken<UserService<UserType>>('UserService');
