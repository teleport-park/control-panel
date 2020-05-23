import { Price } from '../../../../../../models/common';

export class InvoiceModel {
    id: string;
    created_at: string;
    type: string;
    status: string;
    comment: string;
    operations: Operation[];
    error: {
        code: string;
        message: string;
    };
}

export class Operation {
    id: string;
    type: string;
    user: {
        id: string;
        display_name: string;
    };
    comment: string;
    income: Price;
    outcome: Price;
}
