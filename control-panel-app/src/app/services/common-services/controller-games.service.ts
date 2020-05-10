import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../api-urls.service';
import { LoaderService } from '../loader.service';
import { VRGame, VRGameRequest } from '../../models/vr-game.model';
import { ToasterService } from '../toaster.service';
import { TranslateService } from '../../common/translations-module';

@Injectable()
export class ControllerGamesService {

    _vrGames: VRGame[];

    _loaderDebounce: number = 100;

    gameType: 'all' | 'polygon' | 'playvr' = 'all';

    filterValue: string = '';

    vrGames$: BehaviorSubject<VRGame[]> = new BehaviorSubject([]);

    refreshGames$: Subject<boolean> = new Subject();

    url: (method) => string = this.urlService.getTNGGames;

    constructor(private http: HttpClient,
                private toaster: ToasterService,
                private urlService: ApiUrlsService,
                private translation: TranslateService,
                private loaderService: LoaderService) {
        // this.getGames();
    }

    public getGames(): void {
        this.loaderService.dispatchShowLoader(true, this._loaderDebounce);
        this.http.get(this.url('GET'))
        .subscribe((result: VRGame[]) => {
            this._vrGames = result;
            this.applyFilter();
            this.loaderService.dispatchShowLoader(false);
            this.refreshGames$.next(true);
        }, _ => {
            this.refreshGames$.next(false);
        });
    }

    update(game: VRGameRequest) {
        this.loaderService.dispatchShowLoader(true);
        this.http.patch(this.url('PATCH'), game).subscribe(
            _ => {
                this.toaster.success(this.getMessage(game), false);
                this.getGames();
            }
        );
    }

    refresh() {
        this._loaderDebounce = 1500;
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
