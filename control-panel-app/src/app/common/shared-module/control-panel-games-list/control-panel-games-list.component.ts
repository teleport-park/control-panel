import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { LoaderService } from '../../../services/loader/loader.service';
import { NGGame } from '../../../models/game.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'control-panel-games-list',
  templateUrl: './control-panel-games-list.component.html',
  styleUrls: ['./control-panel-games-list.component.scss']
})
export class ControlPanelGamesListComponent implements OnInit {

  @Input() games: NGGame[];

  displayedColumns: string[] = ['index', 'name', 'origin', 'active'];

  @Output() toggle: EventEmitter<{ game: NGGame, event: MatSlideToggleChange }> = new EventEmitter();

  constructor(public translations: TranslateService, public loaderService: LoaderService) {
  }

  ngOnInit() {
  }

  toggleGameHandler(event: MatSlideToggleChange, game: NGGame) {
    this.toggle.emit({game, event});
  }
}
