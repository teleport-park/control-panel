import { PageEvent } from '@angular/material';

export interface StoragePaginationInterface {
  /**
   * cashed user pagination state value
   */
  cache: Map<string, PageEvent>;

  /**
   * set value
   * @param key
   * @param value
   */
  setPaginationValue(key: string, value: PageEvent): void;

  /**
   * get pagination value
   * @param key
   */
  getPaginationValue(key: string): PageEvent;
}
