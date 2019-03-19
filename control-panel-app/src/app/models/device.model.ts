/**
 * Base entity
 */
export class Entity {
  id: number;
  identifier: string | number;
  constructor(id: number) {
    this.id = id;
  }
}

/**
 * Device entity
 */
export class Device extends Entity {

  /**
   * Set state
   * @param data
   */
  set state(data: any) {
    this._state = data;
  }
  /**
   * Get state
   */
  get state(): any {
    return this._state;
  }
  constructor({id, identifier= id, name= 'Device'}: InitParams) {
    super(id);
    this.name = name;
    this.identifier = identifier;
  }
  /**
   * Device state
   */
  private _state: any;

  /**
   * Device name
   */
  name: string;

  getName(): string {
    return `${this.name}_${this.identifier}`;
  }
}


/**
 * Init params interface
 */
export interface InitParams {
  id: number;
  identifier: number | string;
  name?: string;
}
