/**
 * controller base model
 */
export class BaseController {

  static readonly MOCK_REF: string = 'mock_ref';
  /**
   * id
   */
  id: string;
   /**
    * reference id
    */
   ref: string;

  online: Date;

  token: string;

  authorized: boolean;

  name: string;

   display_name: string;

   address: string;

  constructor(model) {
    Object.keys(model).forEach(key => {
      this[key] = model[key];
    });
  }
}
