import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppData } from '../../../../interfaces';
import { User } from '../../../../models';
import { ApiUrlsService } from '../../../../services/api-urls.service';

@Injectable()
export class DashboardService {

  userCount$: Observable<number>;

  constructor(private http: HttpClient,
              private apiBuilder: ApiUrlsService) {
    this.getUserCount();
  }

  getUserCount() {
    const requestMethod = 'GET';
    const url = this.apiBuilder.getUsersUrl(requestMethod);
    this.userCount$ = this.http.request(requestMethod, url).pipe(
      map((data: AppData<User>) => data.count)
    );
  }
}
