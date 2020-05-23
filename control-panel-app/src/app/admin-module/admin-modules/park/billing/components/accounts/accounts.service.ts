import { Injectable } from '@angular/core';
import { PagedDataService } from '../../services/paged-data.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class AccountsService extends PagedDataService {

    accounts$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(http: HttpClient, private apiUrl: ApiUrlsService) {
        super(http, apiUrl.getBillingAccounts);
    }

    getAccounts() {
        this.requestHelper.getData()
        .subscribe((result: any[]) => {
                this.accounts$.next(result);
            }, _ => {

            },
            () => {
            }
        );
    }
}
