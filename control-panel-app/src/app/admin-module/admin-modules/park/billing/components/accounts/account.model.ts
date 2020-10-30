import {IAmount} from "../../../../../../interfaces";

export class AccountModel {
  id: string;
  user: {
    id: string,
    display_name: string,
    type: string
  };
  balance: IAmount[];
}
