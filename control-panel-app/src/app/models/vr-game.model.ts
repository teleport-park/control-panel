export class VRGame {
    type: 'polygon' | 'playvr';
    code_name: string;
    fingerprint: string;
    name: string;
    origin: string;
    enabled: boolean;
    active: boolean;
}

export class VRGameRequest {
    code_name: string = '';
    type: string = '';
    enabled: boolean = false;

    constructor(game: VRGame) {
        this.code_name = game.code_name;
        this.type = game.type;
        this.enabled = game.enabled;
    }
}
