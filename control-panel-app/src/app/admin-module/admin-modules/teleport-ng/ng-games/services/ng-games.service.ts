import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { LoaderService } from '../../../../../services/loader.service';
import { VRGame, VRGameRequest } from '../../../../../models/vr-game.model';

@Injectable({
    providedIn: 'root'
})
export class NgGamesService {

    vrGames$: BehaviorSubject<VRGame[]> = new BehaviorSubject([]);

    _vrGames: VRGame[];

    gameType: 'all' | 'polygon' | 'playvr' = 'all';

    filterValue: string = '';

    constructor(private http: HttpClient,
                private toaster: MatSnackBar,
                private urlService: ApiUrlsService,
                private loaderService: LoaderService) {
        this.getGames();
    }

    public getGames(): void {
        this.loaderService.dispatchShowLoader(true);
        this.http.get(this.urlService.getTNGGames('GET'))
        .subscribe((result: VRGame[]) => {
            this._vrGames = result;
            this.applyFilter();
            this.loaderService.dispatchShowLoader(false);
        });
    }

    update(game: VRGameRequest) {
        this.http.patch(this.urlService.getTNGGames('PATCH'), game).subscribe(
            res => {
                this.getGames();
            }
        );
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
}
