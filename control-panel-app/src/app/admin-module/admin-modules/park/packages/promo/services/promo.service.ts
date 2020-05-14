import { Injectable } from '@angular/core';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PromoService {

    promo$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient, private url: ApiUrlsService) {
    }

    getPromo() {
        this.http.get(this.url.getPromo('GET')).subscribe(
            (res: any[]) => this.promo$.next(res)
        );
    }
}
