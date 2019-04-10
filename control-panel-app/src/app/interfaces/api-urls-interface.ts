export type RequestMethod = 'PUT' | 'POST' | 'GET' | 'DELETE';
export interface IApiUrlsInterface {
    getStaffUrl(requestMethod: RequestMethod, id?: number, pageSize?: number, pageNumber?: number): string | null;
    getStaffGroupsUrl(requestMethod: RequestMethod, id?: number, pageSize?: number, pageNumber?: number): string | null;
    getPermissionsUrl(requestMethod: RequestMethod, id?: number, pageSize?: number, pageNumber?: number): string | null;
    getUsersUrl(requestMethod: RequestMethod, id?: number,
                pageSize?: number,
                pageNumber?: number,
                orderByColumn?: string,
                orderDirection?: number,
                queryString?: string): string | null;
}
