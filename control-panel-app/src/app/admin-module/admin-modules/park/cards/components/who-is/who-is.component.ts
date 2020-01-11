import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { WhoIsResponse } from './who-is.model';

@Component({
   selector: 'who-is',
   templateUrl: './who-is.component.html',
   styleUrls: ['./who-is.component.scss']
})
export class WhoIsComponent implements OnInit {

   _cardNumber: string;

   _result: WhoIsResponse;

   constructor(private service: CardsService, private cd: ChangeDetectorRef) {
   }

   ngOnInit() {
      this.service.whoIsResult$.subscribe(res => {
         this._result = res;
         this.cd.markForCheck();
      });
   }

   setCardNumber(value: string) {
      this._cardNumber = value;
   }

   searchCard() {
      if (this._cardNumber) {
         this.service.whoIs(this._cardNumber);
         return;
      }
      this.service.resetWhoIsResult();
   }

   getKeys(obj: object) {
      return Object.keys(obj);
   }
}
