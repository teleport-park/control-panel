import { BaseController } from './base-controller.model';
import { TVRModel } from '../tvr.model';

export class GateController extends BaseController {

  /**
   * type
   */
  readonly TYPE: string = 'GATE';

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
