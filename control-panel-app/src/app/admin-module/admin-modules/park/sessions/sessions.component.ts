import { ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { TranslateService } from '../../../../common/translations-module';
import { PaginationSetting } from '../../../../models/intefaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SessionPlayer } from './session.model';
import { ExtendedFilterUrlParamsInterface } from '../../../../interfaces/extended-filter-url-params.interface';

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

    displayedColumns: string[] = ['game', 'created_at', 'started_at', 'status', 'expires_at', 'completed_at', 'players', 'events', 'error'];

    constructor(public service: SessionsService,
                public translations: TranslateService,
                public cd: ChangeDetectorRef,
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
        this.service.requestHelper.setPagination({limit: event.pageSize, offset: event.pageSize * event.pageIndex} as PaginationSetting);
        this.service.getSessions();
    }

    applyFilter(event: Partial<{time: {t: string, f: string} | null}>) {
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

}
