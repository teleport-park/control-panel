import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { TariffsTree } from '../../../../common/shared-module';
import { catchError, filter } from 'rxjs/operators';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../../../services/loader.service';

@Injectable()
export class PricingService {

    /**
     * tariffs
     */
    prices$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    constructor(private http: HttpClient,
                private urlService: ApiUrlsService,
                private toaster: MatSnackBar,
                private loaderService: LoaderService) {
        this.getPrices();
    }

    /**
     * get tariffs
     */
    public getPrices() {
        this.loaderService.dispatchShowLoader(true);
        this.http.get(this.urlService.getPrices('GET'))
            .pipe(
                filter(data => !!data),
                catchError(err => {
                    this.loaderService.dispatchShowLoader(false);
                    this.showError(err);
                    return EMPTY;
                }))
            .subscribe((result: any[]) => {
                this.prices$.next(result);
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
