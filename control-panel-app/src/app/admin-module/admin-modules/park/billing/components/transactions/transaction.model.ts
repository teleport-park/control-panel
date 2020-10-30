import { Price } from '../../../../../../models/common';
import {AccountModel} from "../accounts/account.model";

export class TransactionModel {
    account: AccountModel;
    id: string;
    ref_id: string;
    account_id: string;
    created_at: string;
    expires_at: string;
    comment: string;
    amount: Price;
}
