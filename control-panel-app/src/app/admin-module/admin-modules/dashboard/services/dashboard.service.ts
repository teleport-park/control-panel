import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardService {

  userCount$: Observable<number>;

  constructor(private http: HttpClient) { }

  getUserCount() {
    this.userCount$ = this.http.get(`${environment.origin}${environment.api.USERS}totalpages/1`).pipe(
      map((result: number) => result)
    );
  }
}
