import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '../../../../common/translations-module';
import { ControllerGamesService } from '../../../../services/common-services/controller-games.service';
import { NGGame, NGGameRequest } from '../../../../models/game.model';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


@Component({
    selector: 'ng-games',
    templateUrl: './ng-games.component.html',
    styleUrls: ['./ng-games.component.scss']
})
export class NgGamesComponent implements OnInit {

    _controllerTypes: string[] = ['playvr', 'polygon'];

    _filterTypes: string[] = ['all', ...this._controllerTypes];

    _typeFilterControl: FormControl = new FormControl('all');

    displayedColumns: string[] = ['name', 'type', 'active', 'enabled'];

    dataSource = new MatTableDataSource();

    @ViewChild(MatSort, {static: true}) sort: MatSort;


    constructor(public service: ControllerGamesService,
                public translations: TranslateService,
                public cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.service.getGames();
        this.sort.sort(({id: 'name', start: 'asc'}) as MatSortable);
        this.service.vrGames$.subscribe(res => {
            this.dataSource.data = res;
            this.dataSource.sort = this.sort;
        });
    }

    toggleGameHandler(event: MatSlideToggleChange, game: NGGame) {
        const payload = new NGGameRequest(game);
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
