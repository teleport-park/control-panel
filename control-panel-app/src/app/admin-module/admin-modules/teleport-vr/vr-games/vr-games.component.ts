import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TranslateService} from '../../../../common/translations-module';
import {VrGamesService} from './services/vr-games.service';

@Component({
  selector: 'games',
  templateUrl: './vr-games.component.html',
  styleUrls: ['./vr-games.component.scss']
})
export class VrGamesComponent implements OnInit {

  displayedColumns: string[] = ['id'];

  sessionColumns: string[] = [
    'id'
  ];

  constructor(public service: VrGamesService,
              public translateService: TranslateService,
              public cd: ChangeDetectorRef) { }
  ngOnInit() {
  }

}
