import { Observable } from 'rxjs';

export interface IRequestHelper {

   Count: number;

   filterData: any;

   setPagination(pagingProps: PaginationSetting): void;

   resetPagination(): void;

   setSorting(props: SortingSettings): void;

   resetSorting(): void;

   setExtendedFilterRequest(request: string): void;

   getData(queryString?: string): Observable<any>;
}

export interface PaginationSetting {
   limit: number;
   offset: number;
}

export interface SortingSettings {
   [key: string]: string;
}
