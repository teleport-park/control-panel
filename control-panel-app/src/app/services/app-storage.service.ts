import {IAppStorageInterface} from '../interfaces/app-storage-interface';
import {AppStorageKey} from '../models/app-storage-key';

export class AppStorageService implements IAppStorageInterface {

  constructor() { }

  getValue<T>(key: AppStorageKey | string, defaultValue?: T): T {
    const v = localStorage.getItem(key);
    try {
      if (v) {
        return JSON.parse(v) as T;
      }
      if (defaultValue) {
        return defaultValue;
      }
    } catch {
        return null;
    }
  }

  removeValue(key: AppStorageKey): void {
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
