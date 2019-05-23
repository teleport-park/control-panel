import { Controller } from './controller.model';
import { Amusement } from '../amusement.model';

export class TNGController extends Controller {
  /**
   * secret key
   */
  secretKey: string;

  /**
   * amusements
   */
  amusements: Amusement[];
  /**
   * type
   */
  readonly TYPE: string = 'TNG';
  constructor() { super(); }
}
