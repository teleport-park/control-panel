import { TVRModel } from '../tvr.model';
import { BaseController } from './base-controller.model';

export class TVRController extends BaseController {
  /**
   * type
   */
  readonly TYPE: string = 'TVR';

  constructor(model: TVRModel) {
    super(model);
    // TODO if doesn't have ref mock him
    this.ref = model.ref ? model.ref : BaseController.MOCK_REF;
  }
}
