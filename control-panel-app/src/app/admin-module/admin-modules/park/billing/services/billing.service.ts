import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()

export class BillingService {

   lastSyncTime$: BehaviorSubject<Date> = new BehaviorSubject(new Date());

   syncHistory$: BehaviorSubject<any[]> = new BehaviorSubject([]);

   transactions$: BehaviorSubject<any[]> = new BehaviorSubject([]);

   accounts$: BehaviorSubject<any[]> = new BehaviorSubject([]);

   constructor(private http: HttpClient) {
      this.getSynchronizationHistory();
      this.getTransactions();
      this.getAccounts();
   }

   public getTransactions(query?: string) {
      this.transactions$.next([]);
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
