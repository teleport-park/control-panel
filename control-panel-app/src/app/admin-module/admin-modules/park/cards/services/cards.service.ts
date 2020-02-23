import { Injectable } from '@angular/core';
import { Card } from '../../../../../models/card.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../../../services/storage.service';
import { WhoIsResponse } from '../components/who-is/who-is.model';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { ToasterService } from '../../../../../services/toaster.service';

@Injectable()
export class CardsService {

   /**
    * storage key
    */
   public readonly STORAGE_KEY: string = 'CARDS';

   /**
    * cards
    */
   cards$: BehaviorSubject<Card[]> = new BehaviorSubject(null);

   whoIsResult$: BehaviorSubject<WhoIsResponse> = new BehaviorSubject(null);

   constructor(private http: HttpClient,
               private storage: StorageService,
               private toaster: ToasterService,
               private apiUrl: ApiUrlsService) {
      // this.getCards();
   }

   /**
    * get cards
    */
   getCards(): void {
      this.http.get(this.apiUrl.getCards('GET'))
      .subscribe((result: Card[]) => {
         this.cards$.next(result);
      });
   }

   unboundCard(id: string) {
      this.http.delete(this.apiUrl.getCards('DELETE', id), {responseType: 'text'})
      .subscribe(res => {
         this.toaster.success('BOUND_CARD_SUCCESS');
         this.getCards();
      });
   }

   boundCard(id: string, user: any) {
      this.http.put(this.apiUrl.getCards('PUT', id), user, {responseType: 'text'})
      .subscribe(res => {
         this.toaster.success('BOUND_CARD_SUCCESS');
      });
   }

   /**
    * who im request
    */
   whoIs(cardNumber: string) {
      this.http.get(`./assets/data/who-im.json`).subscribe((result: any) => {
         if (result) {
            this.whoIsResult$.next(result);
         }
      });
   }


   resetWhoIsResult() {
      this.whoIsResult$.next(null);
   }

}
