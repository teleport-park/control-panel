import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Game, IPrice} from '../model/games.model';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { validateSchema } from '../../../../../utils/utils';
import { GameSchema } from '../../../../../utils/schemas';

@Injectable()

export class GamesService {

   games$: BehaviorSubject<IPrice[]> = new BehaviorSubject<IPrice[]>([]);

   constructor(private http: HttpClient, private apiUrl: ApiUrlsService) {
       this.getGames();
   }

   getGames() {
       const res: IPrice[] = [
           {
               id: '1',
               category: 'TVR',
               name: 'TEST1',
               maxPlayers: 5,
               maxDuration: 15,
               price: {
                   amount: 10,
                   currency: 'TLPVR'
               }
           }, {
               id: '2',
               category: 'TVR',
               name: 'TEST2',
               maxPlayers: 5,
               maxDuration: 30,
               price: {
                   amount: 15,
                   currency: 'TLPVR'
               }
           }, {
               id: '3',
               category: 'TVR',
               name: 'TEST3',
               maxPlayers: 5,
               maxDuration: 30,
               price: {
                   amount: 20,
                   currency: 'TLPVR'
               }
           }, {
               id: '4',
               category: 'TVR',
               name: 'TEST4',
               maxPlayers: 5,
               maxDuration: 45,
               price: {
                   amount: 10,
                   currency: 'TLPVR'
               }
           }
       ]
      // this.http.request('GET', this.apiUrl.getGames('GET'))
      // .pipe(map((res: IPrice[]) => {
      //     if (environment.dev && res?.length) {
      //         validateSchema(res[0], GameSchema, this.apiUrl.getGames('GET'));
      //     }
      //     return res;
      // }))
      // .subscribe(
      //    (res: IPrice[]) => {
            this.games$.next(res);
      //    }
      // );
   }

   updatePrice(game: Game[]) {
      return this.http.request('PATCH', this.apiUrl.getGames('PATCH'), {body: game});
      // this.http.request('PATCH', this.apiUrl.getGames('PATCH'), {body: game}).subscribe(
      //    (res: Game[]) =>  this.games$.next(res)
      // );
   }

}
