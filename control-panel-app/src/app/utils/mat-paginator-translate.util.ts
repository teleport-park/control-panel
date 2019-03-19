import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '../common/translations-module';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorTranslateUtil extends MatPaginatorIntl {

  constructor(private translateService: TranslateService) {
    super();
    translateService.locale.subscribe(() => {
      this.translateLabel();
    });
    this.translateLabel();
  }

  /**
   * get range label
   * @param page
   * @param pageSize
   * @param length
   */
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    const of = this.translateService ? this.translateService.instant('USERS_TABLE_PAGINATOR_OF_LABEL') : 'of';
    if (length === 0 || pageSize === 0) {
      return `0 ${of} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${of} ${length}`;
  }
  /**
   * translate label
   */
  private translateLabel() {
    this.itemsPerPageLabel = this.translateService.instant('USERS_TABLE_PAGINATION_ITEMS_PER_PAGE_LABEL');
    this.nextPageLabel = this.translateService.instant('USERS_TABLE_PAGINATION_NEXT_PAGE_LABEL');
    this.previousPageLabel = this.translateService.instant('USERS_TABLE_PAGINATION_PREVIOUS_PAGE_LABEL');
    this.changes.next();
  }
}
