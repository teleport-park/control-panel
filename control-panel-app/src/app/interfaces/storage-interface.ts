export interface StorageInterface {
  /**
   * cashed state value
   */
  cache: Map<string, any>;

  /**
   * set value
   * @param key
   * @param value
   */
  setValue(key: string, value: any): void;

  /**
   * get  value
   * @param key
   */
  getValue(key: string): any;
}
