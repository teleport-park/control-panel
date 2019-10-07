import { Observable } from 'rxjs';

export interface IPagination {
    Count: number;

    setPagination(pagingProps: PaginationSetting): void;

    getPagination(): PaginationSetting;

    resetPagination(): void;

    getData(queryString?: string): Observable<any>;
}

export interface PaginationSetting {
    limit: number;
    offset: number;
}
