import { IRequestHelper, PaginationSetting, SortingSettings } from '../intefaces';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export class RequestHelper implements IRequestHelper {

    static readonly DEFAULT_PAGINATION_SETTINGS: PaginationSetting = {limit: 50, offset: 0};

    static readonly DEFAULT_SORTING_SETTINGS: SortingSettings = {};

    private _count: number;

    private _filterRequest: string;

    public filterData: any;

    public _query: string;

    get count() {
        return this._count;
    }

    get pageSize() {
        return this._pagination.limit;
    }

    constructor(
        private _request: (query?: string,
                           limit?: number,
                           offset?: number,
                           otherParams?: { [key: string]: string },
                           filterRequest?: string) => Observable<HttpResponse<any[]>>,
        private _pagination: PaginationSetting = RequestHelper.DEFAULT_PAGINATION_SETTINGS,
        private _sorting: SortingSettings = RequestHelper.DEFAULT_SORTING_SETTINGS
    ) {
    }

    public setPagination(pagingProps: PaginationSetting): void {
        this._pagination = pagingProps;
    }

    public setSorting(props: SortingSettings): void {
        this._sorting = props;
    }

    public resetSorting(): void {
        this._sorting = {};
    }

    public resetPagination() {
        this._pagination.offset = RequestHelper.DEFAULT_PAGINATION_SETTINGS.offset;
    }

    public setExtendedFilterRequest(request: string): void {
        this._filterRequest = request;
    }

    public resetFilterRequest() {
        this._filterRequest = '';
    }

    public getData(queryString?: string): Observable<any[]> {
        this._query = queryString !== undefined ? queryString : this._query;
        return this._request(this._query, this._pagination.limit, this._pagination.offset, this._sorting, this._filterRequest)
        .pipe(
            tap((res: HttpResponse<any[]>) => {
                this._count = +res.headers.get('x-total-count');
            }),
            map((response: HttpResponse<any>) => response.body)
        );
    }
}
