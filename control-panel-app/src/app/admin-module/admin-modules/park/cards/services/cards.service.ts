import { Injectable } from '@angular/core';
import { Card } from '../../../../../models/card.model';
import { StaffMember, User } from '../../../../../models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DefaultPagination } from '../../../../../models/default-pagination';
import { StorageService } from '../../../../../services/storage.service';

@Injectable()
export class CardsService {

  /**
   * storage key
   */
  public readonly STORAGE_KEY: string = 'CARDS';

  /**
   * cards
   */
  cards: BehaviorSubject<Card[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private storage: StorageService) {
    this.getCards();
  }

  /**
   * get cards
   */
  getCards(): void {
    const page = this.storage.getValue(this.STORAGE_KEY) || new DefaultPagination();
    this.http.get(`./assets/data/cards.json`).subscribe((result: Card[]) => {
      result.forEach((item: Card) => {
        if (item.ownerType === 'user') {
          item.currentOwner = Object.assign(new User(), item.currentOwner);
        }
        if (item.ownerType === 'staff') {
          item.currentOwner = Object.assign(new StaffMember(), item.currentOwner);
        }
      });
      this.cards.next(result);
    });
  }
}
