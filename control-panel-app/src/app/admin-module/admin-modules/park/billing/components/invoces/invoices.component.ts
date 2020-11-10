import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {ConfirmDialogComponent, ConfirmDialogData, TimeFilterState} from '../../../../../../common/shared-module';
import { InvoicesService } from './invoices.service';
import { PaginationSetting } from '../../../../../../models/helpers/request-helper.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '../../../../../../common/translations-module';
import {Invoice} from "./invoice";
import {filter} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

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

  displayedColumns: string[] = ['created_at', 'status', 'operations', 'error', 'action'];

  constructor(public service: InvoicesService, public translations: TranslateService, private dialog: MatDialog) {
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

  reject(invoice: Invoice) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_REJECT_CONFIRM_MESSAGE',
        messageParams: [invoice.comment]
      } as ConfirmDialogData,
      autoFocus: false
    }).afterClosed()
      .pipe(filter((res: boolean) => !!res))
      .subscribe(_ => {
        this.service.rejectInvoice(invoice.id).subscribe(
          res => {
            console.log(res);
          }
        )
      });
  }

}
