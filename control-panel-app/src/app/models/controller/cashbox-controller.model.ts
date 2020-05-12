import { BaseController } from './base-controller.model';
import { TVRModel } from '../tvr.model';

export class CashBoxController extends BaseController {

    locked: boolean;
    enabled: boolean;
    access_token: string;

    connected_at: string | Date;

    constructor(model: TVRModel) {
        super(model);
    }
}
