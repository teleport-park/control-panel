import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { PaginationSetting } from '../../../../../../models/helpers/request-helper.interface';

@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

    constructor(public service: TransactionsService) {
    }

    ngOnInit() {
        this.service.getTransactions();
    }

    /**
     * change page handler
     * @param event
     */
    paginationChangeHandler(event: PaginationSetting): void {
        this.service.requestHelper.setPagination(event);
        this.service.getTransactions();
    }

}
