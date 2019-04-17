import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TariffsTree } from '../../../../common/shared-module';

@Injectable()
export class TariffsService {

  /**
   * tariffs
   */
  tariffs$: BehaviorSubject<TariffsTree[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { this.getTariffs(); }

  /**
   * get tariffs
   */
  getTariffs() {
    const url = './assets/data/tariffs.json';
    this.http.request('GET', url).subscribe((data: TariffsTree[]) => {
      this.tariffs$.next(data);
    });
  }
}
