import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { VRGame } from '../../../models/vr-game.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/typings/slide-toggle';
import { LoaderService } from '../../../services/loader.service';

@Component({
    selector: 'control-panel-games-list',
    templateUrl: './control-panel-games-list.component.html',
    styleUrls: ['./control-panel-games-list.component.scss']
})
export class ControlPanelGamesListComponent implements OnInit {

    @Input() games: VRGame[];

    displayedColumns: string[] = ['name', 'type', 'active', 'enabled'];

    @Output() toggle: EventEmitter<{game: VRGame, event: MatSlideToggleChange}> = new EventEmitter();

    constructor(private translateService: TranslateService, public loaderService: LoaderService) {
    }

    ngOnInit() {
    }

    toggleGameHandler(event: MatSlideToggleChange, game: VRGame) {
        this.toggle.emit({game, event});
    }
}
