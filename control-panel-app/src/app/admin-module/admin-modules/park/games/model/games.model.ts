import {IAmount} from '../../../../../interfaces';

export class Game {
    id: string;
    name: string;
    type: string;
    source: string;
    image_url: string;
    active: boolean;
    prices: Price[];

    constructor() {
    }
}

export class Price {
    promo_id: string | null;
    display_name: string | null;
    currency: string;
    amount: number;
}

export interface IPrice<I = string> {
    id: I;
    category: string;
    name: string;
    maxPlayers: number;
    maxDuration: number;
    price: IAmount;
    enabled: boolean;
}
