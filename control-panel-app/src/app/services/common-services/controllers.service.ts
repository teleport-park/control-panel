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
            this.refreshControllers$.next(true);
        }, error => {
            this.refreshControllers$.next(false);
        });
        // setTimeout(() => {
        //     this.controllers$.next(this.mockData);
        //     this.refreshControllers$.next(true);
        // });
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
}
