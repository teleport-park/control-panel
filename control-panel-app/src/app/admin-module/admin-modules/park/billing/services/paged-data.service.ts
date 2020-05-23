import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RequestHelper } from '../../../../../models/helpers/request-helper';

// @Injectable()
//
// export class BillingService1 {
//
//     lastSyncTime$: BehaviorSubject<Date> = new BehaviorSubject(new Date());
//
//     syncHistory$: BehaviorSubject<any[]> = new BehaviorSubject([]);
//
//     transactions$: BehaviorSubject<any[]> = new BehaviorSubject([]);
//
//     invoices$: BehaviorSubject<any[]> = new BehaviorSubject([]);
//
//     accounts$: BehaviorSubject<any[]> = new BehaviorSubject([]);
//
//     constructor(private http: HttpClient, private apiBuilder: ApiUrlsService) {
//         // this.getSynchronizationHistory();
//         // this.getTransactions();
//         // this.getInvoices();
//         // this.getAccounts();
//     }
//
//     public getTransactions(query?: string) {
//         this.http.get(this.apiBuilder.getBillingTransactions('GET'))
//         .pipe(filter(data => !!data),
//             map((res: any[]) => (res.map(item => {
//                 item.owner = item.user.name;
//                 return item;
//             }))))
//         .subscribe((result: any[]) => {
//             this.transactions$.next(result);
//         });
//     }
//
//     public getAccounts(filterState?: { positive: boolean, negative: boolean }) {
//         this.http.get(this.apiBuilder.getBillingAccounts('GET'))
//         .pipe(filter(data => !!data),
//             map((res: any[]) => {
//                 let result;
//                 if (filterState) {
//                     if ((!filterState.negative && !filterState.positive) || (filterState.negative && filterState.positive)) {
//                         return res;
//                     }
//                     if (filterState.negative) {
//                         result = res.filter((item) => this.getBalanceAmount(item.balance) <= 0);
//                         return result;
//                     }
//                     if (filterState.positive) {
//                         result = res.filter((item) => this.getBalanceAmount(item.balance) > 0);
//                         return result;
//                     }
//                 } else {
//                     return res;
//                 }
//             }))
//         .subscribe(
//             (res: any[]) => this.accounts$.next(res)
//         );
//     }
//
//     public getInvoices(filterState?: Partial<TimeFilterState>) {
//         this.http.get(this.apiBuilder.getBillingInvoices('GET'))
//         .pipe(
//             filter(data => !!data),
//             map((res: any[]) => {
//                 if (filterState) {
//                     if (!Object.values(filterState.status).some(v => v)) {
//                         return res;
//                     }
//                     const statusFilters = Object.keys(filterState.status);
//                     let result = [];
//                     statusFilters.forEach((status: string) => {
//                         if (filterState.status[status]) {
//                             result = [...result, ...res.filter(i => i.status === status)];
//                         }
//                     });
//                     return result.length === res.length ? res : result;
//                 } else {
//                     return res;
//                 }
//             })
//         )
//         .subscribe(
//             (res: any[]) => this.invoices$.next(res)
//         );
//     }
//
//     public getSynchronizationHistory() {
//         this.syncHistory$.next([{
//             status: 'success',
//             timestamp: '2019-10-09T21:01:49.171Z'
//         }]);
//     }
//
//     private getBalanceAmount(balance: { currency: string, amount: number }[]): number {
//         return balance.map((item: { currency: string, amount: number }) => item.amount).reduce((prev, curr) => prev + curr);
//     }
// }

@Injectable()

export abstract class PagedDataService implements OnDestroy {

    refreshInstances$: Subject<boolean> = new Subject();

    requestHelper: RequestHelper = new RequestHelper(this.getPagedItems.bind(this));

    constructor(private http: HttpClient,
                private getUrl: (method: string,
                                 id?: string,
                                 query?: string,
                                 limit?: number,
                                 offset?: number,
                                 sortingParams?: { [key: string]: string },
                                 filtersQuery?: string) => string) {
    }

    protected getPagedItems(query: string = null,
                          limit: number = 50,
                          offset: number = 0,
                          sortingParams: { [key: string]: string } = {},
                          filtersQuery: string = ''
    ): Observable<HttpResponse<any>> {
        return this.http.get(this.getUrl('GET', null, query, limit, offset, sortingParams, filtersQuery), {observe: 'response'});
    }

    ngOnDestroy(): void {
        this.refreshInstances$.complete();
    }
}
