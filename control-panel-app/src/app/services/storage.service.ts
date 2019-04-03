import { Injectable } from '@angular/core';
import { StoragePaginationAbstract } from '../models/storage-pagination-abstract';

@Injectable({
  providedIn: 'root'
})

export class StorageService extends StoragePaginationAbstract {

  constructor() {
    super();
  }

  setValue(key: string, value: any): void {
    super.setValue(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key: string): any {
    if (this.cache.has(key)) {
      return super.getValue(key);
    } else if (localStorage.getItem(key)) {
      this.cache.set(key, JSON.parse(localStorage.getItem(key)));
      return super.getValue(key);
    }
  }

  clear(): void {
    this.cache.clear();
    localStorage.clear();
  }
}
