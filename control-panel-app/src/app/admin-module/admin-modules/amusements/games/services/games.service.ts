import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Amusement } from '../../../../../models';

@Injectable()
export class GamesService {
  /**
   * amusements
   */
  amusements$: BehaviorSubject<Amusement[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getAmusements();
  }

  /**
   * get amusements
   */
  getAmusements(): void {
    const url = './assets/data/amusements.json';
    this.http.request<Amusement[]>('GET', url)
      .subscribe((data: Amusement[]) => {
        this.amusements$.next(data);
      });
  }
}
