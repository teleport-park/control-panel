import { TVRModel } from '../tvr.model';
import { BaseController } from './base-controller.model';

export class TVRController extends BaseController {

    machine_token: string;
    name: string;
    enabled: boolean;
    ip_address: string;
    status: 'idle' | string;
    game: Game;
    registered: boolean;

    constructor(model: TVRModel) {
        super(model);
    }
}

export class Game {
    id: string;
    name: string;
}
