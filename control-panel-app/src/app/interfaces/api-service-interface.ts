import { BehaviorSubject } from 'rxjs';

export interface ApiServiceInterface<T> {
  readonly STORAGE_KEY: string;
  api: string;
  items$: BehaviorSubject<T>;

  getItems(): void;

  addItem(item: T): void;

  editItem(item: T): void;

  removeItem(item: T): void;
}




