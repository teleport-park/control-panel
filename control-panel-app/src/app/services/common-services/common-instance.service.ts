import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InstanceService } from '../../models';
import { BaseController } from '../../models/controller';
import { ControllerType } from '../../models/types';


export class CommonInstanceService implements InstanceService<ControllerType>, OnDestroy {

    instances$: BehaviorSubject<ControllerType[]> = new BehaviorSubject([]);

    refreshInstances$: Subject<boolean> = new Subject();

    constructor(private http: HttpClient,
                private getUrl: (method: string, ref?: string) => string,
                private getControllerInstance: (item: ControllerType) => ControllerType) {
    }

    getInstances(): void {
        this.http.get<ControllerType[]>(this.getUrl('GET'))
        .subscribe((result: ControllerType[]) => {
            const instances = result.map((item: ControllerType) => this.getControllerInstance(item));
            this.instances$.next(instances);
            this.refreshInstances$.next(true);
        }, err => {
            this.refreshInstances$.next(false);
        });
    }

    grant(item: ControllerType): void {
        // TODO mock instances
        if (item.ref === BaseController.MOCK_REF) {
            this.instances$.getValue().find((instance: ControllerType) => instance.id === item.id).authorized = true;
            return;
        }
        this.http.put<any>(this.getUrl('PUT', item.ref), {})
        .subscribe((result) => {
            console.log('[grant result] -> ', result);
            this.getInstances();
        });
    }

    revoke(item: ControllerType): void {
        // TODO mock instances
        if (item.ref === BaseController.MOCK_REF) {
            this.instances$.getValue().find((instance: ControllerType) => instance.id === item.id).authorized = false;
            return;
        }
        this.http.delete<any>(this.getUrl('DELETE', item.ref))
        .subscribe((result) => {
            console.log('[revoke result] -> ', result);
            this.getInstances();
        });
    }

    refresh(): Observable<boolean> {
        this.getInstances();
        return this.refreshInstances$;
    }

    ngOnDestroy(): void {
        this.instances$.complete();
        this.refreshInstances$.complete();
    }
}
