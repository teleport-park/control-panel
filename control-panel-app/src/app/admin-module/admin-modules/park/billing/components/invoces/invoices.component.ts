import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TimeFilterState } from '../../../../../../common/shared-module';
import { InvoicesService } from './invoices.service';
import { PaginationSetting } from '../../../../../../models/helpers/request-helper.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '../../../../../../common/translations-module';

@Component({
    selector: 'invoces',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    /**
     * mat paginator instance
     */
    @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

    displayedColumns: string[] = ['created_at', 'type', 'status', 'operations', 'error'];

    constructor(public service: InvoicesService, public translations: TranslateService) {
    }

    ngOnInit() {
        this.service.getInvoices();
    }

    applyFilterHandler(filterState: Partial<TimeFilterState>) {
        console.table(filterState);
        // this.service.getInvoices(filterState);
    }

    /**
     * pagination handler
     * @param event
     */
    paginationChangeHandler(event: PageEvent): void {
        this.paginator.toArray().forEach(p => {
            p.pageSize = event.pageSize;
            p.pageIndex = event.pageIndex;
        });
        this.service.requestHelper.setPagination({limit: event.pageSize, offset: event.pageSize * event.pageIndex} as PaginationSetting);
        this.service.getInvoices();
    }

}
