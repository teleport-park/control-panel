import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { PaginationSetting } from '../../../../../../models/helpers/request-helper.interface';
import { TranslateService } from '../../../../../../common/translations-module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ExtendedFilterUrlParamsInterface } from '../../../../../../interfaces/extended-filter-url-params.interface';

@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

    /**
     * mat paginator instance
     */
    @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

    displayedColumns: string[] = ['id', 'account_id', 'created_at', 'amount'];

    constructor(public service: TransactionsService, public translations: TranslateService,
                @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
    }

    ngOnInit() {
        this.service.getTransactions();
    }

    applyFilter(event: Partial<{time: {t: string, f: string} | null}>) {
        if (event.time) {
            this.service.requestHelper.setExtendedFilterRequest(this.extendedFilterUrlBuilder.getExtendedFilterParams(event.time));
            this.service.requestHelper.filterData = event.time;
            this.service.requestHelper.resetPagination();
            this.resetPagination();
            this.service.getTransactions();
        } else {
            this.service.requestHelper.resetFilterRequest();
            this.service.requestHelper.resetPagination();
            this.resetPagination();
            this.service.getTransactions();
        }
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
        this.service.getTransactions();
    }

    resetPagination() {
        this.paginator && this.paginator.toArray().forEach(p => {
            p.pageIndex = 0;
        });
    }

}
