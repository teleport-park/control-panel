import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Package } from '../../../../../common/shared-module/control-panel-ui-package/control-panel-ui-package.model';

@Injectable()
export class IncomeTariffsService {

  tariffs$: BehaviorSubject<Package[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getTariffs();
  }

  getTariffs(): void {
    const url = './assets/data/tariffs-data.json';
    this.http.request('GET', url).subscribe((tariffs: Package[]) => {
      this.tariffs$.next(tariffs);
    });
  }
}
