import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../model/games.model';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { validateSchema } from '../../../../../utils/utils';
import { GameSchema } from '../../../../../utils/schemas';

@Injectable()

export class GamesService {

   games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

   constructor(private http: HttpClient, private apiUrl: ApiUrlsService) {
       this.getGames();
   }

   getGames() {
      this.http.request('GET', this.apiUrl.getGames('GET'))
      .pipe(map((res: Game[]) => {
          if (environment.dev && res?.length) {
              validateSchema(res[0], GameSchema, this.apiUrl.getGames('GET'));
          }
          return res;
      }))
      .subscribe(
         (res: Game[]) => {
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
