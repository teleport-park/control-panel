import { Component, OnInit } from '@angular/core';
import { TimeFilterState } from '../../../../../../common/shared-module';
import { InvoicesService } from './invoices.service';
import { PaginationSetting } from '../../../../../../models/helpers/request-helper.interface';

@Component({
    selector: 'invoces',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    constructor(public service: InvoicesService) {
    }

    ngOnInit() {
        this.service.getInvoices();
    }

    applyFilterHandler(filterState: Partial<TimeFilterState>) {
        console.table(filterState);
        // this.service.getInvoices(filterState);
    }

    /**
     * change page handler
     * @param event
     */
    paginationChangeHandler(event: PaginationSetting): void {
        this.service.requestHelper.setPagination(event);
        this.service.getInvoices();
    }

}
