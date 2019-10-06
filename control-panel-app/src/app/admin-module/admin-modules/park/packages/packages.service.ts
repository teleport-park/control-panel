import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { catchError, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../../../../services/loader.service';
import { Package, PackageHistory } from '../../../../models';

@Injectable()

export class PackagesService {

    packages$: BehaviorSubject<Package[]> = new BehaviorSubject([]);

    packagesHistory$: BehaviorSubject<PackageHistory[]> = new BehaviorSubject([]);

    lastSyncTime$: BehaviorSubject<Date> = new BehaviorSubject(new Date());


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
        .subscribe((result: Package[]) => {
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
        .subscribe((result: PackageHistory[]) => {
            this.packagesHistory$.next(result);
            this.lastSyncTime$.next(result[0].timestamp);
            this.loaderService.dispatchShowLoader(false);
        });
    }

    synchronize() {
        this.http.put(this.urlService.getPackages('GET'), {})
        .pipe(
            filter(data => !!data),
            catchError(err => {
                this.loaderService.dispatchShowLoader(false);
                this.showError(err);
                this.getPackages();
                this.getPackagesHistory();
                return EMPTY;
            }))
        .subscribe((result: any[]) => {
            this.getPackages();
            this.getPackagesHistory();
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
