import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AmusementsItem } from '../amusements.component';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AmusementsService {
  /**
   * amusements
   */
  amusements$: BehaviorSubject<AmusementsItem[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getAmusements();
  }

  /**
   * get amusements
   */
  getAmusements(): void {
    const url = './assets/data/amusements.json';
    this.http.request<AmusementsItem[]>('GET', url)
      .subscribe((data: AmusementsItem[]) => {
        this.amusements$.next(data);
      });
  }
}
