import { BaseController } from './base-controller.model';

export class TNGController extends BaseController {
    /**
     * type
     */
    readonly TYPE: string = 'TNG';

    constructor(model) {
        super(model);
    }
}
