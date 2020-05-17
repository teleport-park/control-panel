export class Promo {
    id: string;
    name: string;
    display_name: string;
    notes: string;
    enabled: boolean;
    removed: boolean;
    conditions: {
        schedule: string,
        first_fill: boolean
    };
    packages: number;
    games: number;
    priority: number;
    moved?: boolean;
    movedFrom?: boolean;
}

export class PromoRequest {
    name: string;
    notes: string;
    enabled: boolean;
    conditions: {
        schedule: string,
        first_fill: boolean
    };
}

