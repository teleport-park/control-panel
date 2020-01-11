import { IPagination, PaginationSetting } from '../intefaces';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Sort } from '@angular/material';

export class Pagination implements IPagination {

    static readonly DEFAULT_PAGINATION_SETTINGS: PaginationSetting = {limit: 10, offset: 0};

    private _count: number;

    get Count() {
        return this._count;
    }

    constructor(
        private _request: (query?: string, limit?: number, offset?: number) => Observable<HttpResponse<any[]>>,
        private _pagination: PaginationSetting = Pagination.DEFAULT_PAGINATION_SETTINGS,
    ) {
    }

    public setPagination(pagingProps: PaginationSetting): void {
        this._pagination = pagingProps;
    }

    public resetPagination() {
        this._pagination.offset = Pagination.DEFAULT_PAGINATION_SETTINGS.offset;
    }

    public getData(queryString?: string): Observable<any[]> {
        return this._request(queryString, this._pagination.limit, this._pagination.offset)
            .pipe(
                tap((res: HttpResponse<any[]>) => {
                    this._count = +res.headers.get('x-total-count');
                }),
                map((response: HttpResponse<any>) => response.body)
            );
    }
}
