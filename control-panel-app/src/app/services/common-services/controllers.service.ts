import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { IControllerService } from '../../models/intefaces';
import { ControllerType } from '../../models/types';

export class ControllersService implements IControllerService<ControllerType> {

    refreshControllers$: Subject<boolean> = new Subject();

    controllers$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient,
                private getUrl: (method: string, ref?: string) => string,
                readonly mock?: any) {
        this.getControllers();
    }

    getControllers() {
        if (this.mock) {
            this.controllers$.next(this.mock);
            this.refreshControllers$.next(true);
            return;
        }
        this.http.get(this.getUrl('GET'))
        .subscribe(res => {
            this.controllers$.next(res);
            this.refreshControllers$.next(true);
        }, _ => {
            this.refreshControllers$.next(false);
        });
    }

    refresh() {
        this.getControllers();
        return this.refreshControllers$;
    }

    grant({token, type, uuid, ip}, id?: string): void {
        const payload = {
            token,
            type,
            uuid,
            ip,
            authorized: true
        };
        this.http.put(this.getUrl('PUT', id), payload)
        .subscribe(_ => {
            this.getControllers();
        });
    }

    revoke({token, type, uuid, ip}, id?: string): void {
        const payload = {
            token,
            type,
            uuid,
            ip,
            authorized: false
        };
        this.http.put(this.getUrl('PUT', id), payload)
        .subscribe(_ => {
            this.getControllers();
        });
    }

    toggle(payload: {enabled: boolean}, id: string) {
        this.http.patch(this.getUrl('PATCH', id), payload)
            .subscribe(_ => {
                this.getControllers();
            });
    }
}
