export interface AppData<T> {
  /**
   * @deprecated
   */
  count: number;
  /**
   * items total
   */
  total: number;
  /**
   * @deprecated
   */
  items: Array<T>;
  /**
   * data list
   */
  data: Array<T>;
  pageSize: number;
  totalPages: number;
}
