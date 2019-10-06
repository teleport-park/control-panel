import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SessionsService} from './services/sessions.service';
import {TranslateService} from '../../../../common/translations-module';

@Component({
  selector: 'sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  displayedColumns: string[] = ['createdAt', 'status', 'restarts', 'restartMessage'];

  sessionColumns: string[] = [
    'createdAt',
    'status',
    'restarts',
     'restartMessage'
  ];

  constructor(public service: SessionsService,
              public translateService: TranslateService,
              public cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
