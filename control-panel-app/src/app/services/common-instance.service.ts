import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { InstanceService } from '../models';
import { LoaderService } from './loader.service';
import { BaseController } from '../models/controller';
import { ControllerType } from '../models/types';


export class CommonInstanceService implements InstanceService<ControllerType>, OnDestroy {

    instances$: BehaviorSubject<ControllerType[]> = new BehaviorSubject([]);

    refreshInstances$: Subject<boolean> = new Subject();

    constructor(private http: HttpClient,
                private toaster: MatSnackBar,
                private loaderService: LoaderService,
                private getUrl: (method: string, ref?: string) => string,
                private getControllerInstance: (item: ControllerType) => ControllerType) {
        this.getInstances();
    }

    getInstances(): void {
        this.loaderService.dispatchShowLoader(true);
        this.http.get<ControllerType[]>(this.getUrl('GET'))
            .pipe(
                catchError(err => {
                    this.showError(err);
                    this.loaderService.dispatchShowLoader(false);
                    this.refreshInstances$.next(false);
                    return EMPTY;
                })
            )
            .subscribe((result: ControllerType[]) => {
                const instances = result.map((item: ControllerType) => this.getControllerInstance(item));
                this.instances$.next(instances);
                this.loaderService.dispatchShowLoader(false);
                this.refreshInstances$.next(true);
            });
    }

    grant(item: ControllerType): void {
        // TODO mock instances
        if (item.ref === BaseController.MOCK_REF) {
            this.instances$.getValue().find((instance: ControllerType) => instance.id === item.id).authorized = true;
            return;
        }
        this.loaderService.dispatchShowLoader(true);
        this.http.put<any>(this.getUrl('PUT', item.ref), {})
            .pipe(catchError(err => {
                this.loaderService.dispatchShowLoader(false);
                this.showError(err);
                return EMPTY;
            }))
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
        this.loaderService.dispatchShowLoader(true);
        this.http.delete<any>(this.getUrl('DELETE', item.ref))
            .pipe(catchError(err => {
                this.loaderService.dispatchShowLoader(false);
                this.showError(err);
                return EMPTY;
            }))
            .subscribe((result) => {
                console.log('[revoke result] -> ', result);
                this.getInstances();
            });
    }

    refresh(): Observable<boolean> {
        this.getInstances();
        return this.refreshInstances$;
    }

    private showError(message) {
        this.toaster.open(message, null, {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'toaster-error'
        });
    }

    ngOnDestroy(): void {
        this.instances$.complete();
        this.refreshInstances$.complete();
    }
}
