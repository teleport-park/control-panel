import { environment } from '../../environments/environment';
import { DefaultPagination } from '../models/default-pagination';
import { DefaultSort } from '../models/default-sort';
import { HttpParams } from '@angular/common/http';
import { SortDirection } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { AppStorageKey } from '../models/app-storage-key';
import { AppStorageService } from '../services/app-storage.service';

export class BuildParamsHelper {
  /**
   * paging api
   */
  static readonly PAGING: { size: string, page: string } = environment.api.paging;

  /**
   * sort api
   */
  static readonly SORT: { column: string, direction: string } = environment.api.sorting;

  constructor() {
  }

  /**
   * get params
   * @param key
   * @param storage
   */
  public getParams(key: string, storage: AppStorageService): {pageSize: number, pageIndex: number, active: string, direction: number} {
    const page = storage.getValue<DefaultPagination>(`${key}${AppStorageKey.Pagination}`) || new DefaultPagination();
    const sort = storage.getValue<DefaultSort>(`${key}${AppStorageKey.Sort}`) || new DefaultSort();
    return {
      ...page,
      active: sort.active,
      direction: this.getDirection(sort.direction)
    };
  }

  /**
   * get page params
   * @param key
   * @param storage
   */
  getPaginationParams(key: string, storage: AppStorageService): {pageSize: number, pageIndex: number} {
    const page = storage.getValue<DefaultPagination>(`${key}${AppStorageKey.Pagination}`) || new DefaultPagination();
    return {...page};
  }

  /**
   * get sort params
   * @param key
   * @param storage
   */
  getSortParams(key: string, storage: StorageService): HttpParams {
    const sort = storage.getValue(`${key}${AppStorageKey.Sort}`) || new DefaultSort();
    return new HttpParams()
      .set(BuildParamsHelper.SORT.column, sort.active)
      .set(BuildParamsHelper.SORT.direction, `${this.getDirection(sort.direction)}`);
  }

  /**
   * get direction
   * @param direction
   */
  private getDirection(direction: SortDirection) {
    switch (direction) {
      case 'asc': {
        return 2;
      }
      case 'desc': {
        return 1;
      }
      default: {
        return 0;
      }
    }
  }
}
