import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../common/translations-module';
import { Card } from '../../../../models/card.model';
import { Permission, StaffMember, Visitor } from '../../../../models';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { PropertyMap } from '../../../utils/property-map';
import { CardsService } from './services/cards.service';
import { filter } from 'rxjs/operators';
import { DefaultPagination } from '../../../../models/default-pagination';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'control-panel-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  /**
   * property translations map
   */
  propertyMap = PropertyMap;

  /**
   * data source
   */
  dataSource: MatTableDataSource<Card>;

  /**
   * displayed column
   */
  displayedColumns: string[] = ['index', 'currentOwner', 'inventoryNumber', 'enabled', 'action'];

  /**
   * simple data column
   */
  simpleDataColumn: string[] = ['inventoryNumber'];

  /**
   * paginator init
   */
  paginatorInit: PageEvent;

  /**
   * constructor
   * @param translateService
   * @param service
   * @param storage
   */
  constructor(public translateService: TranslateService, public service: CardsService, public storage: StorageService) {
  }

  ngOnInit() {
    this.service.cards.pipe(filter(data => !!data)).subscribe((result: Card[]) => {
      this.initDataSource(result);
    });
    if (this.storage && this.storage.getValue(this.service.STORAGE_KEY)) {
      this.paginatorInit = this.storage.getValue(this.service.STORAGE_KEY);
    } else {
      this.paginatorInit = new DefaultPagination();
    }
  }

  /**
   * init data source
   */
  private initDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
  }

  /**
   * get row class
   * @param currentOwner
   */
  getRowClass(currentOwner: Visitor | StaffMember): string {
    if (currentOwner instanceof Visitor) {
      return 'user-row';
    }
    if (currentOwner instanceof StaffMember) {
      // const root = currentOwner.group.permissions as Permission[];
      // if (root.find((permission: Permission) => permission.name === 'ACCESS_ROOT')) {
      //   return 'staff-root-row';
      // } else {
      //   return 'staff-row';
      // }
    }
  }

  /**
   * change card state handler
   * @param card
   */
  changeCardState(card: Card) {
    console.log(card);
  }

  /**
   * change page handler
   * @param event
   */
  changePageHandler(event: PageEvent): void {
    this.storage.setValue(this.service.STORAGE_KEY, event);
  }
}
