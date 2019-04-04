import {AppStorageKey} from '../models/app-storage-key';

export interface AppStorageInterface {
    setValue<T>(value: T, prefix: string | null);
    getValue<T>(key: AppStorageKey, prefix: string | null): T;
    removeValue(key: AppStorageKey, prefix: string | null);
}
