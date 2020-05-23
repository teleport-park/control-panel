import { Injectable } from '@angular/core';
import { PagedDataService } from '../../services/paged-data.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';
import { BehaviorSubject } from 'rxjs';
import { AccountModel } from './account.model';

@Injectable()

export class AccountsService extends PagedDataService {

    accounts$: BehaviorSubject<AccountModel[]> = new BehaviorSubject([]);

    constructor(http: HttpClient, private apiUrl: ApiUrlsService) {
        super(http, apiUrl.getBillingAccounts);
    }

    getAccounts() {
        this.requestHelper.getData()
        .subscribe((result: AccountModel[]) => {
                this.accounts$.next(result);
            }, _ => {

            },
            () => {
            }
        );
    }
}
