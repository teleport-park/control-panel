import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../api-urls.service';
import { LoaderService } from '../loader/loader.service';
import { NGGame, NGGameRequest, VRGameRequest } from '../../models/game.model';
import { ToasterService } from '../toaster.service';
import { TranslateService } from '../../common/translations-module';

@Injectable()
export class ControllerGamesService {

    _vrGames: NGGame[];

    _loaderDebounce: number = 100;

    gameType: 'all' | 'polygon' | 'playvr' = 'all';

    filterValue: string = '';

    vrGames$: BehaviorSubject<NGGame[]> = new BehaviorSubject([]);

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
        .subscribe((result: NGGame[]) => {
            this._vrGames = result;
            this.applyFilter();
            this.loaderService.dispatchShowLoader(false);
            this.refreshGames$.next(true);
        }, _ => {
            this.refreshGames$.next(false);
        });
    }

    update(game: NGGameRequest | VRGameRequest, name?: string) {
        this.loaderService.dispatchShowLoader(true);
        this.http.patch(this.url('PATCH'), game).subscribe(
            _ => {
                this.toaster.success(this.getMessage(game, name), false);
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

    filterInstanceByType(items: NGGame[]): NGGame[] {
        return this.gameType !== 'all' ? items.filter(g => g.type === this.gameType) : items;
    }

    filterInstanceByName(items: NGGame[]): NGGame[] {
        return this.filterValue ? items.filter(i => i.name.toLowerCase().startsWith(this.filterValue.toLowerCase())) : items;
    }

    private getMessage(game: NGGameRequest | VRGameRequest, name) {
        // tslint:disable-next-line:max-line-length
        return `${(game instanceof NGGameRequest) ? game.code_name : name || ''} ${this.translation.instant(game.enabled ? 'ACTIVATED' : 'DEACTIVATED')} ${this.translation.instant('SUCCESS')}`;
    }
}
