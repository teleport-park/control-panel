import { Injectable } from '@angular/core';
import { Card } from '../../../../../models/card.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../../../services/storage.service';
import { WhoIsResponse } from '../components/who-is/who-is.model';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { ToasterService } from '../../../../../services/toaster.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../../common/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { filter, mergeMap } from 'rxjs/operators';

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
               private apiUrl: ApiUrlsService,
               private dialog: MatDialog) {
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

   unbindCard(card: Card) {
      this.dialog.open(ConfirmDialogComponent, {
         data: {
            title: 'DIALOG_CONFIRM_TITLE',
            message: 'DIALOG_UNBIND_CARD_CONFIRM_MESSAGE',
            messageParams: [card.chip_id]
         } as ConfirmDialogData,
         autoFocus: false
      }).afterClosed().pipe(
        filter(data => !!data),
        mergeMap(_ => {
           return this.http.delete(this.apiUrl.getCards('DELETE', card.chip_id), {responseType: 'text'})
        })
      ).subscribe(res => {
         this.toaster.info('UNBIND_CARD_SUCCESS', true);
         this.getCards();
      });
   }

   bindCard(id: string, user: {id: string, type: 'visitor' | 'staff'}) {
      this.http.put(this.apiUrl.getCards('PUT', id), user, {responseType: 'text'})
      .subscribe(res => {
         this.toaster.success('BIND_CARD_SUCCESS', true);
      });
   }

   /**
    * who im request
    */
   whoIs(cardNumber: string | number) {
       this.http.get(this.apiUrl.whoIs('GET', cardNumber)).subscribe((result: any) => {
         if (result) {
            this.whoIsResult$.next(result);
         }
      }, err => {
          debugger;
       });
   }


   resetWhoIsResult() {
      this.whoIsResult$.next(null);
   }

}
