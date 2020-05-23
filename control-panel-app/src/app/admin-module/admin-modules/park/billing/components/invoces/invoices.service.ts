import { Injectable } from '@angular/core';
import { PagedDataService } from '../../services/paged-data.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { InvoiceModel } from './invoice.model';

@Injectable()

export class InvoicesService extends PagedDataService {

    invoices$: BehaviorSubject<InvoiceModel[]> = new BehaviorSubject([]);

    constructor(http: HttpClient, private apiUrl: ApiUrlsService) {
        super(http, apiUrl.getBillingInvoices);
    }

    getInvoices() {
        this.requestHelper.getData()
        .subscribe((result: InvoiceModel[]) => {
                this.invoices$.next(result);
                this.refreshInstances$.next(true);
            }, _ => {
                this.refreshInstances$.next(false);
            },
            () => {
            });
    }

    refresh(): Observable<boolean> {
        this.getInvoices();
        return this.refreshInstances$;
    }
}