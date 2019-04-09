import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionsService {

  STORAGE_KEY = 'TRANSACTIONS';

  transactions$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { this.getTransactions() }

  getTransactions(): void {
    this.http.get('./assets/data/transactions.json').subscribe((data: any) => {
      this.transactions$.next(data);
    });
  }
}
