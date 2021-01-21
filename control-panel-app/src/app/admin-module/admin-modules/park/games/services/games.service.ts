import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IPrice } from '../model/games.model';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { validateSchema } from '../../../../../utils/utils';
import { GameSchema } from '../../../../../utils/schemas';
import { LoaderService } from '../../../../../services/loader/loader.service';
import { ToasterService } from '../../../../../services/toaster.service';

@Injectable()

export class GamesService {

  games$: BehaviorSubject<IPrice[]> = new BehaviorSubject<IPrice[]>([]);

  constructor(private _http: HttpClient,
              private urlService: ApiUrlsService,
              private loaderService: LoaderService,
              private toaster: ToasterService) {
  }

  getPrices() {
    this.loaderService.dispatchShowLoader(true);
    this._http.request('GET', this.urlService.getPrices('GET'))
      .pipe(map((res: IPrice[]) => {
        if (environment.dev && res?.length) {
          validateSchema(res[0], GameSchema, this.urlService.getPrices('GET'));
        }
        return res;
      }))
      .subscribe(
        (res: IPrice[]) => {
          this.games$.next(res);
        }, _ => {
        },
        () => {
          this.loaderService.dispatchShowLoader(false);
        }
      );
  }

  public updatePrice(data: IPrice, id?: string) {
    this.loaderService.dispatchShowLoader(true);
    this._http.post(this.urlService.getPrices('POST', id), data).subscribe(
      _ => {
        this.toaster.success('SUCCESSFULLY', true);
        this.getPrices();
      });
  }

  public deletePrice(id: string) {
    this._http.delete(this.urlService.getPrices('DELETE', id), {responseType: 'text'})
      .subscribe(_ => {
        this.toaster.success('SUCCESSFULLY', true);
        this.getPrices();
      });
  }

}
