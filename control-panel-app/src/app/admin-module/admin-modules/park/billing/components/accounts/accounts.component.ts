import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AccountsService } from './accounts.service';
import { PaginationSetting } from '../../../../../../models/helpers/request-helper.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '../../../../../../common/translations-module';

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

  /**
   * mat paginator instance
   */
  @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

  displayedColumns: string[] = ['user', 'balance'];

  constructor(public service: AccountsService, public translations: TranslateService) {
  }

  ngOnInit() {
    this.service.getAccounts();
  }

  getFilteredResult() {
    // this.service.getAccounts(this.filterState);
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
    this.service.requestHelper.setPagination({
      limit: event.pageSize,
      offset: event.pageSize * event.pageIndex
    } as PaginationSetting);
    this.service.getAccounts();
  }

  getBalance(balance: { currency: string, amount: number }[]): number | string {
    if (!balance || !balance.length) {
      return 'N/A';
    }
    const amount = balance.map(i => i.amount).reduce((prev: number, curr: number) => prev + curr);
    return +amount.toFixed(2);
  }
}
