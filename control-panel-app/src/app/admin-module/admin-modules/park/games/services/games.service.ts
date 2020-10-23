import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Game, IPrice} from '../model/games.model';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { validateSchema } from '../../../../../utils/utils';
import { GameSchema } from '../../../../../utils/schemas';
import {IPackage} from '../../packages/package.model';
import {LoaderService} from '../../../../../services/loader.service';
import {ToasterService} from '../../../../../services/toaster.service';

@Injectable()

export class GamesService {

   games$: BehaviorSubject<IPrice[]> = new BehaviorSubject<IPrice[]>([]);

   constructor(private http: HttpClient, private apiUrl: ApiUrlsService, private loaderService: LoaderService, private toaster: ToasterService) {
       this.getPrices();
   }

   getPrices() {
       this.loaderService.dispatchShowLoader(true);
      this.http.request('GET', this.apiUrl.getPrices('GET'))
      .pipe(map((res: IPrice[]) => {
          if (environment.dev && res?.length) {
              validateSchema(res[0], GameSchema, this.apiUrl.getPrices('GET'));
          }
          return res;
      }))
      .subscribe(
         (res: IPrice[]) => {
            this.games$.next(res);
         }, error => {},
          () => {
              this.loaderService.dispatchShowLoader(false);
          }
      );
   }

    public updatePrice(data: IPrice, id?: string) {
        this.loaderService.dispatchShowLoader(true);
        this.http.post(this.apiUrl.getPrices('POST', id), data).subscribe(
            _ => {
                this.toaster.success('SUCCESSFUL', true);
                this.getPrices();
            });
    }

   // updatePrice(game: Game[]) {
   //    return this.http.request('PATCH', this.apiUrl.getPrices('PATCH'), {body: game});
   //    // this.http.request('PATCH', this.apiUrl.getGames('PATCH'), {body: game}).subscribe(
   //    //    (res: Game[]) =>  this.games$.next(res)
   //    // );
   // }

}
