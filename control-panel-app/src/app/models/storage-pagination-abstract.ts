import { PageEvent } from '@angular/material';
import { StoragePaginationInterface } from '../interfaces/storage-pagination-interface';

export abstract class StoragePaginationAbstract implements StoragePaginationInterface {

  /**
   * cache
   */
  cache: Map<string, PageEvent> = new Map();

  /**
   * get pagination value
   * @param key
   */
  getPaginationValue(key: string): PageEvent {
    return this.cache.get(key);
  }

  /**
   * set pagination value
   * @param key
   * @param value
   */
  setPaginationValue(key: string, value: PageEvent): void {
    this.cache.set(key, value);
  }
}
