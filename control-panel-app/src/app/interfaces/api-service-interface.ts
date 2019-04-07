import { BehaviorSubject } from 'rxjs';
import { AppData } from './app-data-interface';

export interface ApiServiceInterface<T> {
  readonly STORAGE_KEY: string;
  api: string;
  items$: BehaviorSubject<T>;

  getItems(): AppData<T>;

  addItem(item: T): void;

  editItem(item: T): void;

  removeItem(item: T): void;
}




