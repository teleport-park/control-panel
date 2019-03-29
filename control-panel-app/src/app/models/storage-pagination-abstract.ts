import { StoragePaginationInterface } from '../interfaces/storage-pagination-interface';

export abstract class StoragePaginationAbstract implements StoragePaginationInterface {

  /**
   * cache
   */
  cache: Map<string, any> = new Map();

  /**
   * get pagination value
   * @param key
   */
  getValue(key: string): any {
    return this.cache.get(key);
  }

  /**
   * set pagination value
   * @param key
   * @param value
   */
  setValue(key: string, value: any): void {
    this.cache.set(key, value);
  }
}
