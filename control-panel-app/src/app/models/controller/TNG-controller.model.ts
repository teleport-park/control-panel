import { Controller } from './controller.model';

export class TNGController extends Controller {
  /**
   * secret key
   */
  secretKey: string;
  /**
   * type
   */
  readonly TYPE: string = 'TNG';
  constructor() { super(); }
}
