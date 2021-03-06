import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InstanceService } from '../../models';
import { ControllerType } from '../../models/types';
import { SchemaValidationItem } from '../../models/intefaces';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { validateSchema } from '../../utils/utils';


export class CommonInstanceService implements InstanceService<ControllerType>, OnDestroy {

    instances$: BehaviorSubject<ControllerType[]> = new BehaviorSubject([]);

    _instances: Array<ControllerType>;

    operationError$: Subject<any> = new Subject();

    operationSuccess$: Subject<any> = new Subject();

    refreshInstances$: Subject<boolean> = new Subject();

    _filterType: 'all' | 'playvr' | 'polygon' = 'all';

    constructor(private http: HttpClient,
                private getUrl: (method: string, ref?: string) => string,
                private getControllerInstance: (item: ControllerType) => ControllerType,
                private schema?: SchemaValidationItem[]) {
    }

    getInstances(): void {
        this.http.get<ControllerType[]>(this.getUrl('GET'))
        .pipe(map((result: ControllerType[]) => {
            if (environment.dev && result?.length && this.schema) {
                validateSchema(result[0], this.schema, this.getUrl('GET'));
            }
            return result;
        }))
        .subscribe((result: ControllerType[]) => {
            this._instances = result.map((item: ControllerType) => this.getControllerInstance(item));
            this.filterInstanceByType(this._filterType);
            this.refreshInstances$.next(true);
        }, _ => {
            this.refreshInstances$.next(false);
        });
    }

    refresh(): Observable<boolean> {
        this.getInstances();
        return this.refreshInstances$;
    }

    add(item: ControllerType) {
        this.http.post(this.getUrl('POST'), item).subscribe(
            res => {
                this.operationSuccess$.next(res);
                this.refresh();
            }
        );
    }

    update(item: ControllerType, id: string): void {
        this.http.patch(this.getUrl('PATCH', id), item).subscribe(
            res => {
                this.operationSuccess$.next(res);
                this.refresh();
            }
        );
    }

    register({access_token, name, enabled}: ControllerType): void {
        this.http.post(this.getUrl('POST'), {access_token, name, enabled}).subscribe(
            res => {
                this.operationSuccess$.next(res);
                this.refresh();
            }
        );
    }

    remove(id: string) {
        this.http.delete(this.getUrl('DELETE', id), {responseType: 'text'}).subscribe(
            res => {
                this.operationSuccess$.next(res);
                this.refresh();
            }
        );
    }

    toggle(item: ControllerType, id: string): void {
        this.http.patch(this.getUrl('PATCH', id), {enabled: !item.enabled}).subscribe(
            res => {
                this.operationSuccess$.next(res);
                this.refresh();
            }
        );
    }

    filterInstanceByType(type: 'all' | 'playvr' | 'polygon'): void {
        const filteredList = type !== 'all' &&
        this._instances &&
        this._instances.length ? this._instances.filter(i => i.type === type) : this._instances;
        this.instances$.next(filteredList);
        this._filterType = type;
    }

    getServersGames(serverId: string): Observable<any> {
        return this.http.get(this.getUrl('GET', serverId) + '/games');
    }

    ngOnDestroy(): void {
        this.instances$.complete();
        this.refreshInstances$.complete();
    }
}
