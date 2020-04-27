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

    _gameType: 'all' | 'polygon' | 'playvr' = 'all';

    constructor(private http: HttpClient,
                private toaster: MatSnackBar,
                private urlService: ApiUrlsService,
                private loaderService: LoaderService) {
        this.getGames();
    }

    private getGames(): void {
        this.loaderService.dispatchShowLoader(true);
        // this._vrGames = [
        //     {
        //         code_name: 'A-Tech',
        //         type: 'playvr',
        //         version: '1.0.0_licensed',
        //         name: 'A-Tech Cybernetic VR',
        //         origin: 'steam',
        //         enabled: true
        //     }, { code_name: 'A-Tech',
        //         type: 'polygon',
        //         version: '1.0.0_licensed',
        //         name: 'A-Tech Cybernetic VR',
        //         origin: 'steam',
        //         enabled: true}, { code_name: 'A-Tech',
        //         type: 'polygon',
        //         version: '1.0.0_licensed',
        //         name: 'A-Tech Cybernetic VR',
        //         origin: 'steam',
        //         enabled: true}, { code_name: 'A-Tech',
        //         type: 'polygon',
        //         version: '1.0.0_licensed',
        //         name: 'A-Tech Cybernetic VR',
        //         origin: 'steam',
        //         enabled: true},
        //     {
        //         code_name: 'A-Tech',
        //         type: 'playvr',
        //         version: '1.0.0_licensed',
        //         name: 'A-Tech Cybernetic VR',
        //         origin: 'steam',
        //         enabled: true
        //     }, ];
        // this.filterInstanceByType(this._gameType);
        // this.loaderService.dispatchShowLoader(false);
        this.http.get(this.urlService.getTNGGames('GET'))
        .subscribe((result: VRGame[]) => {
            this._vrGames = result;
            this.filterInstanceByType(this._gameType);
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

    filterInstanceByType(type: 'all' | 'polygon' | 'playvr') {
        const filteredList = type !== 'all' ? this._vrGames.filter(g => g.type === type) : this._vrGames;
        this.vrGames$.next(filteredList);
        this._gameType = type;
    }
}
