import {AppStorageKey} from '../models/app-storage-key';

export interface IAppStorageInterface {
    setValue<T>(key: AppStorageKey, value: T);
    getValue<T>(key: AppStorageKey, defaultValue?: T): T;
    removeValue(key: AppStorageKey);
    clearStorage(): void;
}
