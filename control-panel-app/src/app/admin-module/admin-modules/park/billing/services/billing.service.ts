import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { filter, map } from 'rxjs/operators';

@Injectable()

export class BillingService {

   lastSyncTime$: BehaviorSubject<Date> = new BehaviorSubject(new Date());

   syncHistory$: BehaviorSubject<any[]> = new BehaviorSubject([]);

   transactions$: BehaviorSubject<any[]> = new BehaviorSubject([]);

   accounts$: BehaviorSubject<any[]> = new BehaviorSubject([]);

   constructor(private http: HttpClient, private apiBuilder: ApiUrlsService) {
      this.getSynchronizationHistory();
      this.getTransactions();
      this.getAccounts();
   }

   public getTransactions(query?: string) {
      this.http.get('./assets/data/transactions.json')
      .pipe(filter(data => !!data),
         map((res: any[]) => (res.map(item => {
            item.owner = item.user.name;
            return item;
         }))))
      .subscribe((result: any[]) => {
         this.transactions$.next(result);
      });
   }

   public getAccounts() {
      this.accounts$.next([]);
   }

   public getSynchronizationHistory() {
      this.syncHistory$.next([{
         status: 'success',
         timestamp: '2019-10-09T21:01:49.171Z'
      }]);
   }
}
