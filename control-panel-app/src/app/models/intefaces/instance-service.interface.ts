import { BehaviorSubject, Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { ControllerType } from '../types';

export interface InstanceService<T> {
    /**
     * instances behaviour subject
     */
    instances$: BehaviorSubject<Array<T>>;

    /**
     * get instances
     */
    getInstances(): void;

    /**
     * grant
     * @param item
     */
    grant(item: T): void;

    /**
     * revoke
     * @param item
     */
    revoke(item: T): void;

    /**
     * refresh instances
     */
    refresh(): Observable<boolean>;
}

export const INSTANCE_SERVICE = new InjectionToken<InstanceService<ControllerType>>('InstanceService');
