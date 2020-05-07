import { BaseController } from './base-controller.model';
import { TVRModel } from '../tvr.model';

export class CashBoxController extends BaseController {

    uuid: string;

    ip: string;

    constructor(model: TVRModel) {
        super(model);
    }
}
