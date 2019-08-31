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

  private static getPagedUrl(endPoint: string, requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null {
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
      return aub.build();
    }
    return null;
  }

  public getStaffUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null {
    return ApiUrlsService.getPagedUrl('api/staff', requestMethod, id, pageSize, pageNumber);
  }

  public getStaffGroupsUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null {
    return ApiUrlsService.getPagedUrl('api/staffGroups', requestMethod, id, pageSize, pageNumber);
  }

  public getPermissionsUrl(requestMethod: string, id?: number, pageSize?: number, pageNumber?: number): string | null {
    return ApiUrlsService.getPagedUrl('api/permissions', requestMethod, id, pageSize, pageNumber);
  }

  public getTVRUrl(requestMethod: string, id?: number): string | null {
    return ApiUrlsService.getPagedUrl(API.TVR_INSTANCES, requestMethod);
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
