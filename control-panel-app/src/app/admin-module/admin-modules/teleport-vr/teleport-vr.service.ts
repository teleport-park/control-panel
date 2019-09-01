import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { TVRModel } from '../../../models';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../../../services/loader.service';

@Injectable()

export class TeleportVrService implements OnDestroy {

    trvInstances$: BehaviorSubject<TVRModel[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient,
                private apiService: ApiUrlsService,
                private toaster: MatSnackBar,
                private loaderService: LoaderService) {
        this.getTVRInstances();
    }

    getTVRInstances(): void {
        this.loaderService.dispatchShowLoader(true);
        this.http.get<TVRModel[]>(this.apiService.getTVRUrl('GET'))
            .pipe(
                catchError(err => {
                    this.showError(err);
                    this.loaderService.dispatchShowLoader(false);
                    return EMPTY;
                })
            )
            .subscribe((result: TVRModel[]) => {
                this.trvInstances$.next(result);
                this.loaderService.dispatchShowLoader(false);
            });
    }

    grantTVRInstance(item: TVRModel): Observable<any> {
        this.loaderService.dispatchShowLoader(true);
        return this.http.put<any>(this.apiService.getTVRUrl('PUT', item.token), item)
            .pipe(catchError(err => {
                this.loaderService.dispatchShowLoader(false);
                this.showError(err);
                return EMPTY;
            }));
    }

    revokeTVRInstance(token: string): Observable<any> {
        this.loaderService.dispatchShowLoader(true);
        return this.http.delete<any>(this.apiService.getTVRUrl('DELETE', token))
            .pipe(catchError(err => {
                this.loaderService.dispatchShowLoader(false);
                this.showError(err);
                return EMPTY;
            }));
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
        this.trvInstances$.complete();
    }
}
