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

  private static getPagedUrl(endPoint: string, requestMethod: string, id?: number | string, query?: string, pageSize?: number, pageNumber?: number): string | null {
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
        aub.appendUrl(id.toString());
        return aub.build();
      }
      if (pageSize) {
        aub.appendQueryParameter('pageSize', pageSize.toString());
      }
      if (pageNumber) {
        aub.appendQueryParameter('pageNumber', pageNumber.toString());
      }
      if (query) {
          aub.appendQueryParameter('q', query);
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

  public getTVRUrl(requestMethod: 'GET' | 'PUT' | 'DELETE', id?: string): string | null {
    if (requestMethod === 'GET') {
      return ApiUrlsService.getPagedUrl(API.TVR_INSTANCES, requestMethod, id);
    }
    return ApiUrlsService.getPagedUrl(API.TVR_INSTANCES, requestMethod, id) + '/auth';
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

  public getPackages(requestMethod: 'GET' | 'PUT') {
    return ApiUrlsService.getPagedUrl(API.PACKAGES, requestMethod);
  }

  public getSessions(requestMethod: 'GET' | 'PUT') {
    return ApiUrlsService.getPagedUrl(API.SESSIONS, requestMethod);
  }

  public getPackagesHistory(requestMethod: 'GET' | 'PUT') {
    return ApiUrlsService.getPagedUrl(API.PACKAGES_HISTORY, requestMethod);
  }
  public getPrices(requestMethod: 'GET' | 'PUT') {
    return ApiUrlsService.getPagedUrl(API.PRICES, requestMethod);
  }
  public getVisitors(requestMethod: 'GET' | 'PUT' | 'POST' | 'DELETE', id?: string, query?: string) {
    return ApiUrlsService.getPagedUrl(API.VISITORS, requestMethod, id, query);
  }
  public getStaff(requestMethod: 'GET' | 'PUT', id?: string, query?: string) {
    return ApiUrlsService.getPagedUrl(API.STAFF, requestMethod, id, query);
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
