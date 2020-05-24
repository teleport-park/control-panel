import { ErrorModel } from '../../../../models/common';

export class Session {
    id: string;
    status: string;
    comment: string;
    players: SessionPlayer[];
    game: {
        id: string,
        name: string;
    };
    events: [
        {
            id: string;
            status: string;
            comment: string;
            error: ErrorModel
        }
    ];
}

export class SessionPlayer {
    id: string;
    display_name: string;
    name: string;
}
