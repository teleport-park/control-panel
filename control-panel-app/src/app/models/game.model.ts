export class NGGame {
    type: 'polygon' | 'playvr';
    code_name: string;
    fingerprint: string;
    name: string;
    origin: string;
    enabled: boolean;
    active: boolean;
}

export class NGGameRequest {
    code_name: string = '';
    type: string = '';
    enabled: boolean = false;

    constructor(game: NGGame) {
        this.code_name = game.code_name;
        this.type = game.type;
        this.enabled = game.enabled;
    }
}

export class VRGame {
    fingerprint: string;
    enabled: boolean;
    id: string;
    name: string;
}
export class VRGameRequest {
    fingerprints: string[];
    enabled: boolean;
    constructor(game: VRGame) {
        this.fingerprints = [game.fingerprint];
        this.enabled = game.enabled;
    }
}
