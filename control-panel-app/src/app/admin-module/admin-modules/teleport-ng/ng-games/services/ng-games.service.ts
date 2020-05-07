import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { LoaderService } from '../../../../../services/loader.service';
import { VRGame, VRGameRequest } from '../../../../../models/vr-game.model';
import { ToasterService } from '../../../../../services/toaster.service';
import { TranslateService } from '../../../../../common/translations-module';

@Injectable({
    providedIn: 'root'
})
export class NgGamesService {

    vrGames$: BehaviorSubject<VRGame[]> = new BehaviorSubject([]);

    _vrGames: VRGame[];

    gameType: 'all' | 'polygon' | 'playvr' = 'all';

    filterValue: string = '';

    refreshGames$: Subject<boolean> = new Subject();

    constructor(private http: HttpClient,
                private toaster: ToasterService,
                private urlService: ApiUrlsService,
                private translation: TranslateService,
                private loaderService: LoaderService) {
        this.getGames();
    }

    public getGames(): void {
        this.http.get(this.urlService.getTNGGames('GET'))
        .subscribe((result: VRGame[]) => {
            this._vrGames = result;
            this.applyFilter();
            this.loaderService.dispatchShowLoader(false);
            this.refreshGames$.next(true);
        }, error => {
            this.refreshGames$.next(false);
        });
    }

    update(game: VRGameRequest) {
        this.loaderService.dispatchShowLoader(true);
        this.http.patch(this.urlService.getTNGGames('PATCH'), game).subscribe(
            res => {
                this.toaster.success(this.getMessage(game), false);
                this.getGames();
            }
        );
    }

    refresh() {
        this.getGames();
        return this.refreshGames$;
    }

    applyFilter() {
        let filteredList = this.filterInstanceByType(this._vrGames);
        filteredList = this.filterInstanceByName(filteredList);
        this.vrGames$.next(filteredList);
    }

    filterInstanceByType(items: VRGame[]): VRGame[] {
        return this.gameType !== 'all' ? items.filter(g => g.type === this.gameType) : items;
    }

    filterInstanceByName(items: VRGame[]): VRGame[] {
        return this.filterValue ? items.filter(i => i.name.toLowerCase().startsWith(this.filterValue.toLowerCase())) : items;
    }

    private getMessage(game: VRGameRequest) {
        // tslint:disable-next-line:max-line-length
        return `${game.code_name} ${this.translation.instant(game.enabled ? 'ACTIVATED' : 'DEACTIVATED')} ${this.translation.instant('SUCCESS')}`;
    }
}
