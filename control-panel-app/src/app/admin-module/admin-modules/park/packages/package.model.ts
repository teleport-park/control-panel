export class Package {
    id: string = null;
    name: string = '';
    players?: number = null;
    note: string = '';
    enabled: boolean = false;
    plans: Array<{
        promo: string | null,
        payments: Payment[];
        charges: Charge[];
    }> = [{
        promo: null,
        payments: [],
        charges: []
    }];

    constructor({id = null, name, note, enabled = false, promo, payments, charges}) {
        this.id = id;
        this.name = name;
        this.note = note;
        this.enabled = enabled;
    }
}

export class PackageResponse {
    id: string;
    enabled: boolean;
    removed: boolean;
    name: string;
    note: string;
    players: number;
    display_name: string;
    totals:
        {
            payments: Payment;
            charges: Charge
        }[];
}

export class Payment {
    amount: {
        currency: string;
        amount: number;
    };
}

export class Charge {
    amount: {
        currency: string;
        amount: number;
    };
}
