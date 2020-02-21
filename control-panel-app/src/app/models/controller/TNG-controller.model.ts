import { BaseController } from './base-controller.model';

export class TNGController extends BaseController {
    /**
     * type
     */
    readonly TYPE: string = 'TNG';

   enabled: boolean;

   bound: boolean;

    constructor(model) {
        super(model);
    }
}
