import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RequestHelper } from '../../../../../models/helpers/request-helper';

@Injectable()

export abstract class PagedDataService implements OnDestroy {

    refreshInstances$: Subject<boolean> = new Subject();

    requestHelper: RequestHelper = new RequestHelper(this.getPagedItems.bind(this));

    constructor(private http: HttpClient,
                private getUrl: (method: string,
                                 id?: string,
                                 query?: string,
                                 limit?: number,
                                 offset?: number,
                                 sortingParams?: { [key: string]: string },
                                 filtersQuery?: string) => string) {
    }

    protected getPagedItems(query: string = null,
                            limit: number = 50,
                            offset: number = 0,
                            sortingParams: { [key: string]: string } = {},
                            filtersQuery: string = ''
    ): Observable<HttpResponse<any>> {
        return this.http.get(this.getUrl('GET', null, query, limit, offset, sortingParams, filtersQuery), {observe: 'response'});
    }

    ngOnDestroy(): void {
        this.refreshInstances$.complete();
    }
}
