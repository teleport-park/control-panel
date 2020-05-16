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
        // this.plans.promo = promo;
        // this.plans.payments = payments;
        // this.plans.charges = charges;
    }
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
