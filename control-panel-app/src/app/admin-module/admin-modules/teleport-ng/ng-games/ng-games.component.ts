import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '../../../../common/translations-module';
import { NgGamesService } from './services/ng-games.service';
import { VRGame, VRGameRequest } from '../../../../models/vr-game.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { MatDialog, MatRadioChange } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ng-games',
    templateUrl: './ng-games.component.html',
    styleUrls: ['./ng-games.component.scss']
})
export class NgGamesComponent {

    _controllerTypes: string[] = ['playvr', 'polygon'];

    _filterTypes: string[] = ['all', ...this._controllerTypes];

    _typeFilterControl: FormControl = new FormControl('all');

    displayedColumns: string[] = ['code_name', 'version', 'name', 'type', 'origin', 'enabled'];

    constructor(public service: NgGamesService,
                public translateService: TranslateService,
                public cd: ChangeDetectorRef,
                private dialog: MatDialog) {
    }

    toggleGameHandler(game: VRGame) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: this.translateService.instant(game.enabled ? 'DISABLE' : 'ENABLE') + ' ' +
                    this.translateService.instant('DIALOG_CHANGE_ENABLE_STATUS_MESSAGE', [game.name])
            } as ConfirmDialogData
        }).afterClosed().subscribe(res => {
            if (res) {
                const payload = new VRGameRequest(game);
                payload.enabled = !payload.enabled;
                this.service.update(payload);
            }
        });
    }

    typeFilterHandler(event: MatRadioChange) {
        this.service.filterInstanceByType(event.value);
    }

}
