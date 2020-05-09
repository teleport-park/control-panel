import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { ControllerType } from '../types';

export interface InstanceService<T> {
    /**
     * instances behaviour subject
     */
    instances$: BehaviorSubject<Array<T>>;

    /**
     * instances
     */
    _instances: Array<T>;

    /**
     * stream operation error
     */
    operationError$: Subject<any>;

    /**
     * stream operation success
     */
    operationSuccess$: Subject<any>;

    /**
     * get instances
     */
    getInstances(): void;

    /**
     * refresh instances
     */
    refresh(): Observable<boolean>;

    /**
     * add instance
     */
    add(item: T): void;

    /**
     * edit instance
     */
    update(item: T, id: string): void;

    /**
     * register
     */
    register(item: Partial<T>, id: string): void;

    /**
     * remove instance
     */
    remove(id: string): void;

    /**
     * toggle enabled state
     */
    toggle(item: T, id?: string): void;

    /**
     * filter instance by type
     */
    filterInstanceByType(type: string): void;

    /**
     * get server games
     */
    getServersGames(serverId: string): Observable<any>;
}

export const INSTANCE_SERVICE = new InjectionToken<InstanceService<ControllerType>>('InstanceService');
