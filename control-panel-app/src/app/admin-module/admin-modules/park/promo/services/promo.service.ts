import { Injectable } from '@angular/core';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Promo, PromoRequest } from '../promo.model';

@Injectable({
    providedIn: 'root'
})
export class PromoService {

    promo$: BehaviorSubject<Promo[]> = new BehaviorSubject([]);

    private _promo: Promo[];

    get promo() {
        return {...{}, ...this._promo};
    }

    constructor(private http: HttpClient, private url: ApiUrlsService) {
        // this.getPromo();
    }

    getPromo() {
        this.http.get(this.url.getPromo('GET')).subscribe(
            (res: Promo[]) => {
                this._promo = res;
                this.promo$.next(res);
            }
        );
    }

    addPromo(promo: PromoRequest) {
        this.http.post(this.url.getPromo('POST'), promo)
        .subscribe(_ => {
            this.getPromo();
        });
    }

    editPromo(promo: PromoRequest, id: string) {
        this.http.put(this.url.getPromo('PUT', id), promo)
        .subscribe(_ => {
            this.getPromo();
        });
    }

    patchPromo(promoId: string, payload: { enabled: boolean, priority: number }) {
        this.http.patch(this.url.getPromo('PATCH', promoId), payload)
        .subscribe(_ => {
            this.getPromo();
        });
    }

    deletePromo(promoId: string) {
        this.http.delete(this.url.getPromo('DELETE', promoId), {responseType: 'text'})
        .subscribe(_ => {
            this.getPromo();
        });
    }
}
