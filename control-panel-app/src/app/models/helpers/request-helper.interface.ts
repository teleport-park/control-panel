import { Observable } from 'rxjs';

export interface IRequestHelper {

   Count: number;

   setPagination(pagingProps: PaginationSetting): void;

   resetPagination(): void;

   setSorting(props: SortingSettings): void;

   resetSorting(): void;

   getData(queryString?: string): Observable<any>;
}

export interface PaginationSetting {
   limit: number;
   offset: number;
}

export interface SortingSettings {
   [key: string]: string;
}
