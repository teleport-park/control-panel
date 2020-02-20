import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../games.model';
import { ApiUrlsService } from '../../../../services/api-urls.service';

@Injectable()

export class GamesService {

   games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

   constructor(private http: HttpClient, private apiUrl: ApiUrlsService) {
   }

   getGames() {
      this.http.request('GET', this.apiUrl.getGames('GET')).subscribe(
         (res: Game[]) => {
            // TODO mock data
            res.push(...res);
            res.push(...res);
            res.push(...res);
            res.push(...res);
            res.push(...res);
            res.push(...res);
            res.push(...res);
            this.games$.next(res);
         }
      );
   }

   updatePrice(game: Game[]) {
      return this.http.request('PATCH', this.apiUrl.getGames('PATCH'), {body: game});
      // this.http.request('PATCH', this.apiUrl.getGames('PATCH'), {body: game}).subscribe(
      //    (res: Game[]) =>  this.games$.next(res)
      // );
   }

}
