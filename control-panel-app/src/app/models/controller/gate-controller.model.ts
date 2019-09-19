import { BaseController } from './base-controller.model';
import { TVRModel } from '../tvr.model';

export class GateController extends BaseController {

  /**
   * type
   */
  readonly TYPE: string = 'GATE';

  constructor(model: TVRModel) {
    super(model);
    // TODO if doesn't have ref mock him
    this.ref = model.ref ? model.ref : BaseController.MOCK_REF;
  }
}
