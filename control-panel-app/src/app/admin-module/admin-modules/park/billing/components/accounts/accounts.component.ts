import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';
import { PaginationSetting } from '../../../../../../models/helpers/request-helper.interface';

@Component({
    selector: 'accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

    filterState: { positive: boolean, negative: boolean } = {
        positive: false,
        negative: false
    };

    constructor(public service: AccountsService) {
    }

    ngOnInit() {
        this.service.getAccounts();
    }

    getFilteredResult() {
        // this.service.getAccounts(this.filterState);
    }

    /**
     * change page handler
     * @param event
     */
    paginationChangeHandler(event: PaginationSetting): void {
        this.service.requestHelper.setPagination(event);
        this.service.getAccounts();
    }

}
