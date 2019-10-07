import { Observable } from 'rxjs';

export interface IPagination {

    Count: number;

    setPagination(pagingProps: PaginationSetting): void;

    resetPagination(): void;

    getData(queryString?: string): Observable<any>;
}

export interface PaginationSetting {
    limit: number;
    offset: number;
}
