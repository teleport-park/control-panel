export interface AppData<T> {
  count: number;
  items: Array<T>;
  pageSize: number;
  totalPages: number;
}
