export class Package {
    id: string = null;
    name: string = '';
    players?: number = null;
    note: string = '';
    enabled: boolean = false;
    plans: Array<{
        promo_id: string | null,
        payments: Payment[];
        charges: Charge[];
    }> = [{
        promo_id: null,
        payments: [],
        charges: []
    }];
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
    currency: string;
    amount: number;
}

export class Charge {
    currency: string;
    amount: number;
}
