import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InstanceService } from '../../models';
import { BaseController } from '../../models/controller';
import { ControllerType } from '../../models/types';


export class CommonInstanceService implements InstanceService<ControllerType>, OnDestroy {

    instances$: BehaviorSubject<ControllerType[]> = new BehaviorSubject([]);

    _instances: Array<ControllerType>;

    operationError$: Subject<any> = new Subject();

    operationSuccess$: Subject<any> = new Subject();

    refreshInstances$: Subject<boolean> = new Subject();

    _filterType: 'all' | 'playvr' | 'polygon' = 'all';

    constructor(private http: HttpClient,
                private getUrl: (method: string, ref?: string) => string,
                private getControllerInstance: (item: ControllerType) => ControllerType) {
    }

    getInstances(): void {
        this.http.get<ControllerType[]>(this.getUrl('GET'))
        .subscribe((result: ControllerType[]) => {
            this._instances = result.map((item: ControllerType) => this.getControllerInstance(item));
            this.filterInstanceByType(this._filterType);
            this.refreshInstances$.next(true);
        }, err => {
            this.refreshInstances$.next(false);
        });
    }

    // grant(item: ControllerType): void {
    //     // TODO mock instances
    //     if (item.ref === BaseController.MOCK_REF) {
    //         this.instances$.getValue().find((instance: ControllerType) => instance.id === item.id).authorized = true;
    //         return;
    //     }
    //     this.http.put<any>(this.getUrl('PUT', item.ref), {})
    //     .subscribe((result) => {
    //         console.log('[grant result] -> ', result);
    //         this.getInstances();
    //     });
    // }
    //
    // revoke(item: ControllerType): void {
    //     // TODO mock instances
    //     if (item.ref === BaseController.MOCK_REF) {
    //         this.instances$.getValue().find((instance: ControllerType) => instance.id === item.id).authorized = false;
    //         return;
    //     }
    //     this.http.delete<any>(this.getUrl('DELETE', item.ref))
    //     .subscribe((result) => {
    //         console.log('[revoke result] -> ', result);
    //         this.getInstances();
    //     });
    // }

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
        this.http.put(this.getUrl('PUT', id), item).subscribe(
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

    toggle(item: ControllerType): void {
        this.http.patch(this.getUrl('PATCH', item.id), {enabled: !item.enabled}).subscribe(
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
