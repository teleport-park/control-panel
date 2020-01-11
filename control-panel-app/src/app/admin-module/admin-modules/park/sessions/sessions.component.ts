import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { TranslateService } from '../../../../common/translations-module';
import { PaginationSetting } from '../../../../models/intefaces';

@Component({
   selector: 'sessions',
   templateUrl: './sessions.component.html',
   styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
   displayedColumns: string[] = ['created_at', 'status', 'restarts', 'restartMessage'];

   sessionColumns: string[] = [
      'created_at',
      'status',
      'restarts',
      'restartMessage'
   ];

   constructor(public service: SessionsService,
               public translateService: TranslateService,
               public cd: ChangeDetectorRef) {
   }

   ngOnInit() {
      this.service.getSessions();
   }

   paginationChangeHandler(event: PaginationSetting) {
      this.service.pagination.setPagination(event);
      this.service.getSessions();
   }

}
