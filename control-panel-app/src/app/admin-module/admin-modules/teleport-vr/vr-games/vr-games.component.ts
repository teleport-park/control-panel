import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRadioChange, MatSlideToggleChange, MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { NgGamesService } from '../../teleport-ng/ng-games/services/ng-games.service';
import { TranslateService } from '../../../../common/translations-module';
import { VRGame, VRGameRequest } from '../../../../models/vr-game.model';

@Component({
    selector: 'vr-games',
    templateUrl: './vr-games.component.html',
    styleUrls: ['./vr-games.component.scss']
})
export class VrGamesComponent implements OnInit {

    _controllerTypes: string[] = ['playvr', 'polygon'];

    _filterTypes: string[] = ['all', ...this._controllerTypes];

    _typeFilterControl: FormControl = new FormControl('all');

    displayedColumns: string[] = ['name', 'type', 'active', 'enabled'];

    dataSource = new MatTableDataSource();

    @ViewChild(MatSort, {static: true}) sort: MatSort;


    constructor(public service: NgGamesService,
                public translateService: TranslateService,
                public cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.sort.sort(({id: 'name', start: 'asc'}) as MatSortable);
        this.service.vrGames$.subscribe(res => {
            this.dataSource.data = res;
            this.dataSource.sort = this.sort;
        });
    }

    toggleGameHandler(event: MatSlideToggleChange, game: VRGame) {
        const payload = new VRGameRequest(game);
        payload.enabled = !payload.enabled;
        game.enabled = !game.enabled;
        event.source.checked = game.enabled;
        this.cd.markForCheck();
        this.service.update(payload);
        event.source.checked = game.enabled;
    }

    typeFilterHandler(event: MatRadioChange) {
        this.service.gameType = event.value;
        this.service.applyFilter();
    }

    applyFilter(value: string) {
        this.service.filterValue = value;
        this.service.applyFilter();
    }

}
