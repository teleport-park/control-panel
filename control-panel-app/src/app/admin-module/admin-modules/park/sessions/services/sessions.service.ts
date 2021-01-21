import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { RequestHelper } from '../../../../../models/helpers/request-helper';
import { Session } from '../session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  requestHelper: RequestHelper = new RequestHelper(this.getPagedSessions.bind(this));

  refreshInstances$: Subject<boolean> = new Subject();

  sessions$: BehaviorSubject<Session[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
              private urlService: ApiUrlsService) {
    this.getSessions();
  }

  getSessions(): void {
    this.requestHelper.getData()
      .subscribe((sessions: Session[]) => {
        this.sessions$.next(sessions);
        this.refreshInstances$.next(true);
      }, err => {
        this.refreshInstances$.next(false);
      });
  }

  private getPagedSessions(query: string = null,
                           limit: number = 50,
                           offset: number = 0,
                           sortingParams: { [key: string]: string } = {},
                           filtersQuery: string = ''): Observable<HttpResponse<any>> {
    return this.http.get(this.urlService.getSessions('GET', null, query, limit, offset, sortingParams, filtersQuery), {observe: 'response'});
  }

  refresh(): Observable<boolean> {
    this.getSessions();
    return this.refreshInstances$;
  }

  rejectSession(id: string) {
    return this.http.put(this.urlService.getSessions('PUT', id), {action: 'reject'});
  }
}
