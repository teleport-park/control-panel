import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { IControllerService } from '../../models/intefaces';
import { ControllerType } from '../../models/types';

export class ControllersService implements IControllerService<ControllerType> {

    refreshControllers$: Subject<boolean> = new Subject();

    controllers$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient,
                private getUrl: (method: string, ref?: string) => string,
                private mockData: any) {
        this.getControllers();
    }

    getControllers() {
        this.http.get(this.getUrl('GET'))
        .subscribe(res => {
            this.controllers$.next(res);
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
        .subscribe(res => {
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
        .subscribe(res => {
            this.getControllers();
        });
    }
}
