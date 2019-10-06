import { InjectionToken } from '@angular/core';

export interface UserService<T> {
    getUserData(): Array<T>;
}

export const USER_SERVICE = new InjectionToken<UserService<any>>('UserService');
