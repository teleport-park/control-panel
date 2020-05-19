import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/typings/slide-toggle';
import { LoaderService } from '../../../services/loader.service';
import { NGGame } from '../../../models/game.model';

@Component({
    selector: 'control-panel-games-list',
    templateUrl: './control-panel-games-list.component.html',
    styleUrls: ['./control-panel-games-list.component.scss']
})
export class ControlPanelGamesListComponent implements OnInit {

    @Input() games: NGGame[];

    displayedColumns: string[] = ['index', 'name', 'origin', 'active'];

    @Output() toggle: EventEmitter<{game: NGGame, event: MatSlideToggleChange}> = new EventEmitter();

    constructor(private translations: TranslateService, public loaderService: LoaderService) {
    }

    ngOnInit() {
    }

    toggleGameHandler(event: MatSlideToggleChange, game: NGGame) {
        this.toggle.emit({game, event});
    }
}
