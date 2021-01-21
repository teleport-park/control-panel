import { Injectable } from '@angular/core';
import { StorageInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class StorageService implements StorageInterface {

  cache: Map<string, any> = new Map();

  constructor() {
  }

  setValue(key: string, value: any): void {
    this.cache.set(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key: string): any {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    if (localStorage.getItem(key)) {
      this.cache.set(key, JSON.parse(localStorage.getItem(key)));
      return this.cache.get(key);
    }
  }

  clear(): void {
    this.cache.clear();
    localStorage.clear();
  }
}
