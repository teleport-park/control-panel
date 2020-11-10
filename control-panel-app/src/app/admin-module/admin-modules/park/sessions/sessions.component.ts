import {ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SessionsService} from './services/sessions.service';
import {TranslateService} from '../../../../common/translations-module';
import {PaginationSetting} from '../../../../models/intefaces';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Session, SessionPlayer} from './session.model';
import {ExtendedFilterUrlParamsInterface} from '../../../../interfaces/extended-filter-url-params.interface';
import {ConfirmDialogComponent, ConfirmDialogData} from "../../../../common/shared-module";
import {filter} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  /**
   * mat paginator instance
   */
  @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

  displayedColumns: string[] = ['game', 'created_at', 'started_at', 'status', 'expires_at', 'completed_at', 'players', 'events', 'error', 'action'];

  constructor(public service: SessionsService,
              public translations: TranslateService,
              public cd: ChangeDetectorRef,
              private dialog: MatDialog,
              @Inject('ExtendedFilterUrlParamsInterface') private extendedFilterUrlBuilder: ExtendedFilterUrlParamsInterface) {
  }

  ngOnInit() {
    this.service.getSessions();
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
    this.service.getSessions();
  }

  applyFilter(event: Partial<{ time: { t: string, f: string } | null }>) {
    if (event.time) {
      this.service.requestHelper.setExtendedFilterRequest(this.extendedFilterUrlBuilder.getExtendedFilterParams(event.time));
      this.service.requestHelper.filterData = event.time;
      this.service.requestHelper.resetPagination();
      this.resetPagination();
      this.service.getSessions();
    } else {
      this.service.requestHelper.resetFilterRequest();
      this.service.requestHelper.resetPagination();
      this.resetPagination();
      this.service.getSessions();
    }
  }

  getPlayersNames(players: SessionPlayer[]) {
    return players.map(player => player.display_name || player.name).join(', ');
  }

  resetPagination() {
    this.paginator && this.paginator.toArray().forEach(p => {
      p.pageIndex = 0;
    });
  }

  reject(session: Session) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_REJECT_CONFIRM_MESSAGE',
        messageParams: [session.comment + ' ' + session.id]
      } as ConfirmDialogData,
      autoFocus: false
    }).afterClosed()
      .pipe(filter((res: boolean) => !!res))
      .subscribe(_ => {
        this.service.rejectSession(session.id).subscribe(
          res => {
            console.log(res);
          }
        )
      });
  }
}
