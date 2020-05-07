import { BaseController } from './base-controller.model';
import { TVRModel } from '../tvr.model';

export class CashBoxController extends BaseController {
    /**
     * type
     */
    readonly TYPE: string = 'CASH-BOX';

    constructor(model: TVRModel) {
        super(model);
    }
}
