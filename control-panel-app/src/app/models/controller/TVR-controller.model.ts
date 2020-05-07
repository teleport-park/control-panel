import { TVRModel } from '../tvr.model';
import { BaseController } from './base-controller.model';

export class TVRController extends BaseController {

    uuid: string;

    ip: string;

    constructor(model: TVRModel) {
        super(model);
    }
}
