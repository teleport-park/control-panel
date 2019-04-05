import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { AppData } from '../../../../interfaces';
import { User } from '../../../../models';

@Injectable()
export class DashboardService {

  userCount$: Observable<number>;

  constructor(private http: HttpClient) { this.getUserCount(); }

  getUserCount() {
    this.userCount$ = this.http.get(`${environment.origin}${environment.api.USERS}`).pipe(
      map((data: AppData<User>) => data.count)
    );
  }
}
