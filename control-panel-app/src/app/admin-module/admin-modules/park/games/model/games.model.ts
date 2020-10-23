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

export class Price implements IPrice<string> {
    id: string = '-1';
    category: string = '';
    name: string = '';
    maxPlayers: number = 1;
    maxDuration: number = 15;
    price = {
        currency: 'TVPLR',
        amount: 0
    };
    enabled: true;
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
