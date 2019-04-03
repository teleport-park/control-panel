import {AppStorageKey} from '../models/app-storage-key';

export interface AppStorageInterface {
    initWithPrefix(prefix: string);
    setValue<T>(value: T);
    getValue<T>(key: AppStorageKey): T;
}
