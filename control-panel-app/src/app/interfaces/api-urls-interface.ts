export interface IApiUrlsInterface {
    getStaffUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null;
    getStaffGroupsUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null;
    getPermissionsUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null;
    getUsersUrl(requestMethod: string, id?: number,
                pageSize?: number,
                pageNumber?: number,
                orderByColumn?: string,
                orderDirection?: number,
                queryString?: string): string | null;
}
