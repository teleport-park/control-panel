export class VRGame {
    type: 'polygon' | 'playvr';
    code_name: string;
    version: string;
    name: string;
    origin: string;
    enabled: boolean;
}

export class VRGameRequest {
    code_name: string = '';
    version: string = '';
    enabled: boolean = false;

    constructor(game: VRGame) {
        this.code_name = game.code_name;
        this.enabled = game.enabled;
        this.version = game.version;
    }
}
