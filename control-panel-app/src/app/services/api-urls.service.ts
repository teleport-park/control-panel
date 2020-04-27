import { Injectable } from '@angular/core';
import { ApiUrlBuilder } from '../models/api-url-builder';
import { IApiUrlsInterface } from '../interfaces/api-urls-interface';
import { InitService } from './init.service';
import { API } from '../api';

@Injectable({
   providedIn: 'root'
})
export class ApiUrlsService implements IApiUrlsInterface {

   private static ORIGIN: string;

   constructor(private initService: InitService) {
      ApiUrlsService.ORIGIN = initService.config.api_url;
   }

   private static getPagedUrl(endPoint: string,
                              requestMethod: string,
                              id?: number | string,
                              query?: string,
                              limit?: number,
                              offset?: number,
                              sortingParams?: {[key: string]: string},
                              filterRequest?: string): string | null {
      const originEndPoint = `${ApiUrlsService.ORIGIN}${endPoint}`;
      const aub = new ApiUrlBuilder(originEndPoint, requestMethod);

      if (aub.isRequestMethodDelete() || aub.isRequestMethodPut() || aub.isRequestMethodPatch()) {
         aub.appendUrl(id ? id.toString() : '');
         return aub.build();
      }

      if (aub.isRequestMethodPost()) {
         return aub.build();
      }

      if (aub.isRequestMethodGet()) {
         if (id) {
            aub.appendUrl(id.toString());
            return aub.build();
         }
         if (limit) {
            aub.appendQueryParameter('l', limit.toString());
         }
         if (offset || offset === 0) {
            aub.appendQueryParameter('o', offset.toString());
         }
         if (query) {
            aub.appendQueryParameter('q', query);
         }
         if (sortingParams) {
            Object.keys(sortingParams).forEach(key => {
               aub.appendQueryParameter(key, sortingParams[key].toString());
            });
         }
         if (filterRequest) {
            aub.addQueryParams(filterRequest);
         }
         return aub.build();
      }
      return null;
   }

   public getStaffUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null {
      return ApiUrlsService.getPagedUrl('api/staff', requestMethod, id, null, pageSize, pageNumber);
   }

   public getStaffGroupsUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null {
      return ApiUrlsService.getPagedUrl('api/staffGroups', requestMethod, id, null, pageSize, pageNumber);
   }

   public getPermissionsUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null {
      return ApiUrlsService.getPagedUrl('api/permissions', requestMethod, id, null, pageSize, pageNumber);
   }

   public getTVRUrl(requestMethod: 'GET' | 'PUT' | 'DELETE' | 'PATCH', id?: string): string | null {
      if (requestMethod === 'GET') {
         return ApiUrlsService.getPagedUrl(API.TNG_INSTANCES, requestMethod, id);
      }
      return ApiUrlsService.getPagedUrl(API.TNG_INSTANCES, requestMethod, id);
   }

   public getGateUrl(requestMethod: 'GET' | 'PUT' | 'DELETE', id?: string): string | null {
      if (requestMethod === 'GET') {
         return ApiUrlsService.getPagedUrl(API.GATE_INSTANCES, requestMethod, id);
      }
      return ApiUrlsService.getPagedUrl(API.GATE_INSTANCES, requestMethod, id) + '/auth';
   }

   public getCashBox(requestMethod: 'GET' | 'PUT' | 'DELETE', id?: string): string | null {
      if (requestMethod === 'GET') {
         return ApiUrlsService.getPagedUrl(API.CASH_BOX_INSTANCES, requestMethod, id);
      }
      return ApiUrlsService.getPagedUrl(API.CASH_BOX_INSTANCES, requestMethod, id) + '/auth';
   }

   public getPackages(requestMethod: 'GET' | 'PUT' | 'POST' | 'PATCH', id?: string) {
      return ApiUrlsService.getPagedUrl(API.PACKAGES, requestMethod, id);
   }

   public getSessions(requestMethod: 'GET' | 'PUT', id?: string, query?: string, limit?: number, offset?: number) {
      return ApiUrlsService.getPagedUrl(API.SESSIONS, requestMethod, id, query, limit, offset);
   }

   public getPackagesHistory(requestMethod: 'GET' | 'PUT') {
      return ApiUrlsService.getPagedUrl(API.PACKAGES_HISTORY, requestMethod);
   }

   public getPrices(requestMethod: 'GET' | 'PUT') {
      return ApiUrlsService.getPagedUrl(API.PRICES, requestMethod);
   }

   public getTNGGames(requestMethod: 'GET' | 'PATCH') {
      return ApiUrlsService.getPagedUrl(API.TNG_GAMES, requestMethod);
   }
   public getGames(requestMethod: 'GET' | 'PATCH') {
      return ApiUrlsService.getPagedUrl(API.GAMES, requestMethod);
   }

   public getCards(requestMethod: 'GET' | 'DELETE' | 'PUT', id?: string) {
      return ApiUrlsService.getPagedUrl(API.CARDS, requestMethod, id);
   }

   public getVisitors(requestMethod: 'GET' | 'PUT' | 'POST' | 'DELETE',
                      id?: string,
                      query?: string,
                      limit?: number,
                      offset?: number,
                      sortingParams?: {[key: string]: string},
                      filterRequest?: string) {
      return ApiUrlsService.getPagedUrl(API.VISITORS, requestMethod, id, query, limit, offset, sortingParams, filterRequest);
   }

   public getStaff(requestMethod: 'GET' | 'PUT' | 'POST' | 'DELETE',
                   id?: string,
                   query?: string,
                   limit?: number,
                   offset?: number,
                   sortingParams?: {[key: string]: string},
                   filterRequest?: string) {
      return ApiUrlsService.getPagedUrl(API.STAFF, requestMethod, id, query, limit, offset, sortingParams, filterRequest);
   }

   public getTransactions(requestMethod: 'GET') {
      return ApiUrlsService.getPagedUrl(API.TRANSACTIONS, requestMethod);
   }

   public getUsersUrl(requestMethod: string, id?: number,
                      pageSize?: number,
                      pageNumber?: number,
                      orderByColumn?: string,
                      orderDirection?: number,
                      queryString?: string): string | null {
      const endPoint = 'api/users';
      const originEndPoint = `${ApiUrlsService.ORIGIN}${endPoint}`;
      const aub = new ApiUrlBuilder(originEndPoint, requestMethod);

      if (aub.isRequestMethodDelete() || aub.isRequestMethodPut()) {
         aub.appendUrl(id.toString());
         return aub.build();
      }

      if (aub.isRequestMethodPost()) {
         return aub.build();
      }

      if (aub.isRequestMethodGet()) {
         if (id) {
            aub.appendQueryParameter('id', id.toString());
            return aub.build();
         }
         if (pageSize) {
            aub.appendQueryParameter('pageSize', pageSize.toString());
         }
         if (pageNumber) {
            aub.appendQueryParameter('pageNumber', pageNumber.toString());
         }
         if (orderByColumn) {
            aub.appendQueryParameter('orderByColumn', orderByColumn);
         }
         if (orderDirection || orderDirection === 0) {
            aub.appendQueryParameter('orderDirection', orderDirection.toString());
         }
         if (queryString) {
            aub.appendQueryParameter('queryString', queryString);
         }
         return aub.build();
      }
      return null;
   }
}
