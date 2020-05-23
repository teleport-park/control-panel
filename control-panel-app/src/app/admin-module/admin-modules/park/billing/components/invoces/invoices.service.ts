import { Injectable } from '@angular/core';
import { PagedDataService } from '../../services/paged-data.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class InvoicesService extends PagedDataService {

    invoices$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(http: HttpClient, private apiUrl: ApiUrlsService) {
        super(http, apiUrl.getBillingInvoices);
    }

    getInvoices() {
        this.requestHelper.getData()
        .subscribe((result: any[]) => {
                this.invoices$.next(result);
            }, _ => {

            },
            () => {
            });
    }
}
