import { Injectable } from '@angular/core';
import { PagedDataService } from '../../services/paged-data.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from './invoice';
import { RequestHelper } from '../../../../../../models/helpers/request-helper';

@Injectable()

export class InvoicesService extends PagedDataService {

  invoices$: BehaviorSubject<Invoice[]> = new BehaviorSubject([]);

  constructor(public http: HttpClient, private apiUrl: ApiUrlsService) {
    super(http, apiUrl.getBillingInvoices);
    this.requestHelper = new RequestHelper(this.getPagedItems.bind(this), {limit: 25, offset: 0});
  }

  getInvoices() {
    this.requestHelper.getData()
      .subscribe((result: Invoice[]) => {
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

  rejectInvoice(id: string) {
    return this.http.put(this.apiUrl.getBillingInvoices('PUT', id), {action: 'reject'})
  }
}
