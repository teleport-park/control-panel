import { PageEvent } from '@angular/material';

export class DefaultPagination extends PageEvent {
  pageIndex = 0;
  pageSize = 50;
}
