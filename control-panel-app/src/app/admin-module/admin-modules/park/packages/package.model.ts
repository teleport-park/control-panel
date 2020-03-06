export class Package {
    id: string;
    name: string;
    players: number;
    note: string;
    enabled: boolean;
    payments: Payment[];
    charges: Charge[];
}

export class Payment {
    amount: {
        currency: string;
        amount: number;
        inPercentage: boolean;
    };
    note: string;
}

export class Charge {
    amount: {
        currency: string;
        amount: number;
        inPercentage: boolean;
    };
    note: string;
    players: number[];
}
