import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../common/translations-module';
import { Card } from '../../../../models/card.model';
import { StaffMember, Visitor } from '../../../../models';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { PropertyMap } from '../../../utils/property-map';
import { CardsService } from './services/cards.service';
import { DefaultPagination } from '../../../../models/default-pagination';
import { StorageService } from '../../../../services/storage.service';
import { ToasterService } from '../../../../services/toaster.service';

@Component({
   selector: 'control-panel-cards',
   templateUrl: './cards.component.html',
   styleUrls: ['./cards.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
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
   displayedColumns: string[] = ['index', 'chip_id', 'created_at', 'comment', 'binding', 'action'];

   /**
    * simple data column
    */
   simpleDataColumn: string[] = ['comment'];

   /**
    * paginator init
    */
   paginatorInit: PageEvent;

    /**
     * constructor
     * @param translateService
     * @param service
     * @param storage
     * @param toaster
     * @param cd
     */
   constructor(public translateService: TranslateService,
               public service: CardsService,
               public storage: StorageService,
               private toaster: ToasterService,
               private cd: ChangeDetectorRef) {
   }

   ngOnInit() {
      this.service.cards$.subscribe((result: Card[]) => {
         this.initDataSource(result);
         this.cd.markForCheck();
      });
      this.service.getCards();
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
   }

   /**
    * change page handler
    * @param event
    */
   changePageHandler(event: PageEvent): void {
      this.storage.setValue(this.service.STORAGE_KEY, event);
   }

    mapRoles = (role) => this.translateService.instant(role);

    async copyClipboard(value: string) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(value);
            this.toaster.success('CHIP_ID_COPY_SUCCESSFUL', true);
        }
    }
}
