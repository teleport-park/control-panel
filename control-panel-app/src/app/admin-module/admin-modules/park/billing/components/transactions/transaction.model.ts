import { Price } from '../../../../../../models/common';

export class TransactionModel {
    id: string;
    ref_id: string;
    account_id: string;
    created_at: string;
    expires_at: string;
    comment: string;
    amount: Price;
}
