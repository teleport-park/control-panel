import { Price } from '../../../../../../models/common';

export class AccountModel {
    id: string;
    user: {
        id: string,
        display_name: string
    };
    balance: Price[];
}
