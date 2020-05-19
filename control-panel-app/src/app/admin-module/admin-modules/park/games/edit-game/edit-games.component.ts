import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../../common/translations-module';

@Component({
  selector: 'edit-game',
  templateUrl: './edit-games.component.html',
  styleUrls: ['./edit-games.component.scss']
})
export class EditGamesComponent implements OnInit {

  constructor(public translations: TranslateService) { }

  ngOnInit() {
  }

}
