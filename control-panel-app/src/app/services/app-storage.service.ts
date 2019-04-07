import { Injectable } from '@angular/core';
import {IAppStorageInterface} from '../interfaces/app-storage-interface';
import {AppStorageKey} from '../models/app-storage-key';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService implements IAppStorageInterface {

  constructor() { }

  getValue<T>(key: AppStorageKey): T {
    const v = localStorage.getItem(key);
    try {
      return JSON.parse(v) as T;
    } catch {
      return null;
    }
  }

  removeValue(key: AppStorageKey) {
    localStorage.removeItem(key);
  }

  setValue<T>(key: AppStorageKey, value: T) {
    const v = JSON.stringify(value);
    localStorage.setItem(key, v);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
