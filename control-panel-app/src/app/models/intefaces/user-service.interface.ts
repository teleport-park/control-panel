import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestHelper } from '../helpers/request-helper';

export interface EntityService<T> {
   requestHelper: RequestHelper;

   entities$: BehaviorSubject<T[]>;

   getEntities(query?: string): void;

   getEntity(id: string): Observable<T>;

   editEntity(entity: T): void;

   addEntity(entity: T): void;

   deleteEntity(id: string): void;
}

export const ENTITY_SERVICE = new InjectionToken<EntityService<any>>('EntityService');
