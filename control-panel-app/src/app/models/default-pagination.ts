import { PageEvent } from '@angular/material/paginator';

export class DefaultPagination extends PageEvent {
  pageIndex = 0;
  pageSize = 50;
}
