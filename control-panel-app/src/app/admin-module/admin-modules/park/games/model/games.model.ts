import { SchemaValidation } from '../../../../../models/intefaces';
import { validateSchema } from '../../../../../utils/utils';
import GameSchema from './game-schema.json';

export class Game implements SchemaValidation {
    INSTANCE_NAME: string = 'Game';
    id: string;
    name: string;
    type: string;
    source: string;
    image_url: string;
    active: boolean;
    prices: Price[];
    constructor() {
    }
    validate(data: object): string[] {
        return validateSchema(Object.keys(data), GameSchema);
    }
}

export class Price {
    promo_id: string | null;
    display_name: string | null;
    currency: string;
    amount: number;
}
