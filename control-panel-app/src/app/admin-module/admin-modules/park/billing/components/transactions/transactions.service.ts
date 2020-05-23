import { Injectable } from '@angular/core';
import { PagedDataService } from '../../services/paged-data.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TransactionModel } from './transaction.model';

@Injectable()

export class TransactionsService extends PagedDataService {

    transactions$: BehaviorSubject<TransactionModel[]> = new BehaviorSubject([]);

    constructor(http: HttpClient, private apiUrl: ApiUrlsService) {
        super(http, apiUrl.getBillingTransactions);
    }

    getTransactions() {
        this.requestHelper.getData()
        .subscribe((result: TransactionModel[]) => {
                this.transactions$.next(result);
                this.refreshInstances$.next(true);
            }, _ => {
                this.refreshInstances$.next(false);
            },
            () => {
            }
        );
    }

    refresh(): Observable<boolean> {
        this.getTransactions();
        return this.refreshInstances$;
    }
}
