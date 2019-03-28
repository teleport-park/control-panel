import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material';
import { StoragePaginationAbstract } from '../models/storage-pagination-abstract';
import { DefaultPagination } from '../models/default-pagination';

@Injectable({
  providedIn: 'root'
})

export class StorageService extends StoragePaginationAbstract {

  /**
   * get locale
   */
  get locale(): string {
    return localStorage.getItem('locale') || 'en';
  }

  constructor() {
    super();
  }
  /**
   * set locale
   * @param locale
   */
  setLocale(locale: string) {
    localStorage.setItem('locale', locale);
  }

  setPaginationValue(key: string, value: PageEvent): void {
    super.setPaginationValue(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  getPaginationValue(key: string): PageEvent {
    if (this.cache.has(key)) {
      return super.getPaginationValue(key);
    } else if (localStorage.getItem(key)) {
      this.cache.set(key, JSON.parse(localStorage.getItem(key)));
      return super.getPaginationValue(key);
    } else {
      const defaultPagination = new DefaultPagination();
      this.cache.set(key, defaultPagination);
      localStorage.setItem(key, JSON.stringify(defaultPagination));
      return super.getPaginationValue(key);
    }
  }
}
