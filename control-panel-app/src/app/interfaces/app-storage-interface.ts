import {AppStorageKey} from '../models/app-storage-key';

export interface IAppStorageInterface {
    setValue<T>(key: AppStorageKey | string, value: T);
    getValue<T>(key: AppStorageKey | string, defaultValue?: T): T;
    removeValue(key: AppStorageKey | string);
    clearStorage(): void;
}
