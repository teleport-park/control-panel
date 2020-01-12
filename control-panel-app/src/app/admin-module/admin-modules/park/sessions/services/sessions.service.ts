import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Session } from 'inspector';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { RequestHelper } from '../../../../../models/helpers/request-helper';

@Injectable({
    providedIn: 'root'
})
export class SessionsService {

    pagination: RequestHelper = new RequestHelper(this.getPagedSessions.bind(this));

    sessions$: BehaviorSubject<Session[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient,
                private urlService: ApiUrlsService) {
        this.getSessions();
    }

    getSessions(): void {
        this.pagination.getData()
        .subscribe((sessions: Session[]) => {
            this.sessions$.next(sessions);
        });
    }

    private getPagedSessions(query = '', limit: number = 50, offset: number = 0): Observable<HttpResponse<any>> {
        return this.http.get(this.urlService.getSessions('GET', null, query, limit, offset), {observe: 'response'});
    }
}
