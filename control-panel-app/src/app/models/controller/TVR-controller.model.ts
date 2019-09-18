import { TVRModel } from '../tvr.model';
import { BaseController } from './base-controller.model';

export class TVRController extends BaseController {
  /**
   * type
   */
  readonly TYPE: string = 'TVR';

  constructor(model: TVRModel) {
    super();
    this.authorized = model.authorized;
    this.id = model.id;
    this.online = model.online;
    this.token = model.token;
    // TODO if doesn't have ref mock him
    this.ref = model.ref ? model.ref : BaseController.MOCK_REF;
  }
}
