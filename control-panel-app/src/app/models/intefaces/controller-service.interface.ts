import { InjectionToken } from '@angular/core';
import { ControllerType } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IControllerService<T> {

    controllers$: BehaviorSubject<Array<T>>;

    /**
     * grant
     * @param item
     * @param id
     */
    grant(item: T, id?: string): void;

    /**
     * revoke
     * @param item
     * @param id
     */
    revoke(item: T, id?: string): void;

    /**
     * toggle
     * @param payload
     * @param id
     */
    toggle(payload: {enabled: boolean}, id): void;

    /**
     * get controllers list
     */
    getControllers(): void;

    /**
     * refresh instances
     */
    refresh(): Observable<boolean>;
}

export const CONTROLLER_SERVICE = new InjectionToken<IControllerService<ControllerType>>('ControllerService');
