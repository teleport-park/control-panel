import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { catchError, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../../../../services/loader.service';

@Injectable()

export class PackagesService {

    packages$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    packagesHistory$: BehaviorSubject<any[]> = new BehaviorSubject([]);


    constructor(private http: HttpClient,
                private urlService: ApiUrlsService,
                private toaster: MatSnackBar,
                private loaderService: LoaderService) {
        this.getPackages();
        this.getPackagesHistory();
    }

    public getPackages() {
        this.loaderService.dispatchShowLoader(true);
        this.http.get(this.urlService.getPackages('GET'))
            .pipe(
                filter(data => !!data),
                catchError(err => {
                    this.loaderService.dispatchShowLoader(false);
                    this.showError(err);
                    return EMPTY;
                }))
            .subscribe((result: any[]) => {
                this.packages$.next(result);
                this.loaderService.dispatchShowLoader(false);
            });
    }

    public getPackagesHistory() {
        this.loaderService.dispatchShowLoader(true);
        this.http.get(this.urlService.getPackagesHistory('GET'))
            .pipe(
                filter(data => !!data),
                catchError(err => {
                    this.loaderService.dispatchShowLoader(false);
                    this.showError(err);
                    return EMPTY;
                }))
            .subscribe((result: any[]) => {
                this.packagesHistory$.next(result);
                this.loaderService.dispatchShowLoader(false);
            });
    }

    private showError(message) {
        this.toaster.open(message, null, {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'toaster-error'
        });
    }
}
