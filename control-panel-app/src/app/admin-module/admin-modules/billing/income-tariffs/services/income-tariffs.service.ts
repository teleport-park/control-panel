import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TreeNode } from '../income-tariffs.component';

@Injectable()
export class IncomeTariffsService {

  tariffs$: BehaviorSubject<TreeNode[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { this.getTariffs(); }

  getTariffs(): void {
    const url = './assets/data/tariffs-data.json';
    this.http.request('GET', url).subscribe((tariffs: TreeNode[]) => {
      this.tariffs$.next(tariffs);
    })
  }
}
