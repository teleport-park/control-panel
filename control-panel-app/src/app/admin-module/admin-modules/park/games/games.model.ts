export class Game {
    id: string;
    name: string;
    type: string;
    source: string;
    image_url: string;
    active: boolean;
    prices: Price[];
}

export class Price {
    promo_id: string | null;
    display_name: string | null;
    currency: string;
    amount: number;
}
