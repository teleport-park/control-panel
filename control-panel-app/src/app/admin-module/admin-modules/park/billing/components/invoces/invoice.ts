import {AccountModel} from "../accounts/account.model";
import {IAmount} from "../../../../../../interfaces";

export class Invoice {
  id: string;
  created_at: string;
  status: string;
  comment: string;
  operations: Operation[];
  error?: {
    code: string;
    message: string;
  };
}

export class Operation {
  id: string;
  account: AccountModel
  comment: string;
  amount: IAmount
}
